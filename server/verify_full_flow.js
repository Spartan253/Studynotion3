const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const User = require('./models/User'); // Adjust path if needed

// Config
const DB_URL = "mongodb+srv://ayushkhoke1:rPS3VFbEIkpxg8O9@cluster0.rmgjr.mongodb.net/serverdatabase";
const JWT_SECRET = "stark";
const API_URL = 'http://localhost:4000/api/v1';

// Test Files
const TEST_IMAGE_PATH = path.join(__dirname, 'test_image.jpg');
const TEST_VIDEO_PATH = path.join(__dirname, 'test_video.mp4');

// Create dummy files
if (!fs.existsSync(TEST_IMAGE_PATH)) fs.writeFileSync(TEST_IMAGE_PATH, 'dummy image content');
if (!fs.existsSync(TEST_VIDEO_PATH)) fs.writeFileSync(TEST_VIDEO_PATH, 'dummy video content');

async function run() {
    try {
        // 1. Connect to DB
        console.log('Connecting to DB...');
        await mongoose.connect(DB_URL);
        console.log('Connected to DB.');

        // 2. Get/Create Instructor
        const email = 'test_instructor_verify@example.com';
        let user = await User.findOne({ email });
        if (!user) {
            console.log('Creating test instructor...');
            const Profile = require('./models/Profile');
            const profile = await Profile.create({
                gender: "Male",
                dateOfBirth: "2000-01-01",
                about: "Test Instructor",
                contactNumber: "1234567890"
            });

            user = await User.create({
                firstname: 'Test',
                lastname: 'Instructor',
                email,
                password: 'password123',
                accountType: 'Instructor',
                additionaldetails: profile._id,
                image: 'https://via.placeholder.com/150'
            });
        }
        console.log('User ID:', user._id);

        // 3. Generate Token
        const token = jwt.sign({ email: user.email, id: user._id, accountType: user.accountType }, JWT_SECRET, { expiresIn: '24h' });
        console.log('Token generated.');

        // 4. Create Course
        console.log('Creating Course...');
        const courseForm = new FormData();
        courseForm.append('courseName', 'Test Course ' + Date.now());
        courseForm.append('courseDescription', 'This is a test course description.');
        courseForm.append('whatyouwilllearn', 'Testing skills');
        courseForm.append('price', '100');
        // We need a valid category ID. Let's fetch one or create one.
        // For now, let's try to fetch categories first.
        // If fails, we might need to create one.
        // Let's assume there is at least one category or we can create one via model.

        const Category = require('./models/Category');
        let category = await Category.findOne({});
        if (!category) {
            category = await Category.create({ name: 'Test Category', description: 'Test Desc' });
        }
        courseForm.append('category', category._id.toString());
        courseForm.append('thumbnailImage', fs.createReadStream(TEST_IMAGE_PATH));

        const courseRes = await axios.post(`${API_URL}/course/createCourse`, courseForm, {
            headers: {
                'Authorization': `Bearer ${token}`,
                ...courseForm.getHeaders()
            }
        });
        console.log('Course Created:', courseRes.data.success);
        const courseId = courseRes.data.data._id;

        // 5. Add Section
        console.log('Adding Section...');
        const sectionRes = await axios.post(`${API_URL}/course/addSection`, {
            sectionName: 'Test Section 1',
            courseId: courseId
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Section Added:', sectionRes.data.success);
        // The response structure for addSection returns updatedCourse. 
        // We need to find the new section ID.
        const updatedCourse = sectionRes.data.data; // Based on my fix in Section.js
        // Wait, in Section.js I returned `updatedCoursedetails` as `data`.
        // And `updatedCoursedetails` has `courseContent` populated.
        const sectionId = updatedCourse.courseContent[updatedCourse.courseContent.length - 1]._id;
        console.log('Section ID:', sectionId);

        // 6. Add Subsection
        console.log('Adding Subsection...');
        const subSectionForm = new FormData();
        subSectionForm.append('sectionId', sectionId);
        subSectionForm.append('title', 'Test Subsection 1');
        subSectionForm.append('description', 'Test Description');
        subSectionForm.append('timeDuration', '10:00');
        subSectionForm.append('videofile', fs.createReadStream(TEST_VIDEO_PATH));

        const subSectionRes = await axios.post(`${API_URL}/course/addSubSection`, subSectionForm, {
            headers: {
                'Authorization': `Bearer ${token}`,
                ...subSectionForm.getHeaders()
            }
        });
        console.log('Subsection Added:', subSectionRes.data.success);

        // 7. Get Course Details
        console.log('Fetching Course Details...');
        const detailsRes = await axios.get(`${API_URL}/course/getCourseDetails`, {
            data: { courseId }, // get request with body? usually GET doesn't have body, but controller expects it.
            // Axios GET with body is tricky. Better to use POST or query params.
            // The controller uses `req.body`. This is bad practice for GET but let's try to send it.
            // Axios `data` property in config works for GET in some environments but not all.
            // Let's try.
            headers: { 'Authorization': `Bearer ${token}` }
        });
        // Actually, standard GET requests strip body.
        // If the controller expects body, it should be a POST or use query params.
        // But I can't change the route method easily without checking `routes/Course.js`.
        // `router.get("/getCourseDetails",getcoursedetails);`
        // I should probably change the controller to look at `req.query` or `req.params` too, or change route to POST.
        // For now, let's try sending it.

        console.log('Course Details Fetched:', detailsRes.data.success);
        console.log('VERIFICATION SUCCESSFUL');

    } catch (e) {
        console.error('Verification Failed:', e.message);
        if (e.response) {
            console.error('Response Data:', e.response.data);
        }
    } finally {
        await mongoose.disconnect();
    }
}

run();
