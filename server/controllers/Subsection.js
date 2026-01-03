const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course");
const { uploadimagetocloudinary } = require("../utils/imageuploader");


//create subsection
// console.log("Uploaded files:", req.files);

exports.createSubsection = async (req, res) => {
  try {
    // Log incoming data
    console.log("------------------------------------------------------------------");
    console.log("CREATE SUBSECTION START");
    console.log("Request body:", req.body);
    console.log("Uploaded files:", req.files);

    const { sectionId, title, timeDuration, description } = req.body;

    // Safely extract video
    const video = req.files?.videofile;

    if (!sectionId || !title || !description || !video) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({
        success: false,
        message: "Please fill all the details including video file",
      });
    }

    console.log("Video file info:", video.name, "Size:", video.size);

    // Upload video to Cloudinary
    console.log("Uploading video to Cloudinary...");
    const uploadDetails = await uploadimagetocloudinary(video, process.env.FOLDER_NAME);
    console.log("Cloudinary upload raw response:", JSON.stringify(uploadDetails, null, 2));

    // Ensure upload returned a usable URL. Try common places if secure_url missing.
    const extractUrl = (ud) => {
      if (!ud) return null;
      if (ud.secure_url) return ud.secure_url;
      if (ud.url) return ud.url;
      if (ud.eager && ud.eager[0]) return ud.eager[0].secure_url || ud.eager[0].url;
      if (ud.resources && Array.isArray(ud.resources) && ud.resources[0]) return ud.resources[0].secure_url || ud.resources[0].url;
      return null;
    };

    const videoUrl = extractUrl(uploadDetails);
    if (!videoUrl) {
      console.error("Cloudinary did not return any accessible URL. Aborting subsection creation.");
      console.error("uploadDetails keys:", uploadDetails ? Object.keys(uploadDetails) : uploadDetails);
      return res.status(500).json({
        success: false,
        message: "Video upload failed or returned no accessible URL",
        uploadKeys: uploadDetails ? Object.keys(uploadDetails) : null,
      });
    }

    // Create SubSection. Prefer timeDuration from client; fall back to upload metadata if provided
    const finalTimeDuration = timeDuration || uploadDetails.duration || "00:00";
    console.log("Final timeDuration to store:", finalTimeDuration);

    console.log("Creating SubSection document...");
    const subsectionDetails = await SubSection.create({
      title,
      timeDuration: finalTimeDuration,
      description,
      videoUrl,
    });
    console.log("SubSection created with ID:", subsectionDetails._id);
    console.log("Saved SubSection document:", JSON.stringify(subsectionDetails, null, 2));

    console.log("Updating Section with ID:", sectionId);
    // Push subsection into section’s subSection array
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: subsectionDetails._id } },
      { new: true }
    ).populate("subSection");

    if (!updatedSection) {
      console.error("Section not found during update!");
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }
    console.log("Updated Section successfully.");

    // Determine courseId
    let courseId = req.body.courseId;
    if (!courseId) {
      console.log("courseId not provided, attempting to find course containing section:", sectionId);
      const courseContainingSection = await Course.findOne({ courseContent: sectionId });
      courseId = courseContainingSection?._id;
      console.log("Found courseId:", courseId);
    } else {
      console.log("Using provided courseId:", courseId);
    }

    // Fetch the updated Course
    let updatedCourse = null;
    if (courseId) {
      console.log("Fetching updated course details...");
      updatedCourse = await Course.findById(courseId)
        .populate({
          path: "courseContent",
          model: "Section",
          populate: {
            path: "subSection",
            model: "SubSection",
          },
        })
        .exec();
      console.log("Updated Course fetched successfully.");
    } else {
      console.warn("Could not determine courseId, returning updatedSection only.");
    }

    console.log("CREATE SUBSECTION END");
    console.log("------------------------------------------------------------------");

    return res.status(200).json({
      success: true,
      message: "Subsection created successfully",
      data: updatedCourse || updatedSection,
    });

  } catch (error) {
    console.error("Error in createSubsection:", error);
    return res.status(500).json({
      success: false,
      message: "Subsection was not created successfully",
      error: error.message,
    });
  }
};

//hw:updatesubsection
exports.updatesubsection = async (req, res) => {
  try {
    const { subsectionId, title, description, timeDuration } = req.body;

    // validate
    if (!subsectionId) {
      return res.status(400).json({
        success: false,
        message: "subsectionId is required",
      });
    }

    // build update object only with provided fields
    const updateObj = {};
    if (title) updateObj.title = title;
    if (description) updateObj.description = description;
    if (timeDuration) updateObj.timeDuration = timeDuration;

    const updatedSubsection = await SubSection.findByIdAndUpdate(
      subsectionId,
      { $set: updateObj },
      { new: true }
    );

    if (!updatedSubsection) {
      return res.status(404).json({ success: false, message: "Subsection not found" });
    }

    return res.status(200).json({
      success: true,
      message: "the data has updated successfully",
      data: updatedSubsection,
    });

  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "the data has  not been updated succesfully",

    })
  }
}

//hw delete subsection
exports.deleteSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId } = req.body;

    if (!sectionId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Section ID and SubSection ID are required",
      });
    }

    // 1️⃣ Check if section exists
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // 2️⃣ Remove subSection reference from Section
    await Section.findByIdAndUpdate(sectionId, {
      $pull: { subSection: subSectionId },
    });

    // 3️⃣ Delete the SubSection itself
    await SubSection.findByIdAndDelete(subSectionId);

    // 4️⃣ Fetch updated course details
    const updatedCourse = await Course.findOne({ courseContent: sectionId })
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedCourse, // ✅ send full updated course
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete subSection",
      error: error.message,
    });
  }
};
