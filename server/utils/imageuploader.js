const cloudinary=require('cloudinary').v2
const fs = require('fs');

exports.uploadimagetocloudinary=async(file,folder,height,quality)=>{
    
   
    if (!file ) {
        throw new Error("File is missing or tempFilePath is undefined.");
    }
    
    // Use tempFilePath if available, otherwise fallback to file.path
    const filePath = file.path || file.tempFilePath;
    console.log("File path before upload:", filePath);

    if (!filePath) {
        throw new Error("File path is missing or not set.");
    }
    const options = { folder };
    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }

    // Detect video by mimetype or filename extension
    const isVideo = (file.mimetype && file.mimetype.startsWith('video')) || (file.name && /\.(mp4|mov|mkv|webm|avi)$/i.test(file.name));

    // Determine file size (bytes)
    const fileSize = file.size || (file.data && file.data.length) || 0;

    // Helper: recursively search for first http(s) url in an object/array
    const findAnyUrlInObject = (obj, visited = new Set(), depth = 0) => {
        if (!obj || depth > 5) return null;
        if (visited.has(obj)) return null;
        visited.add(obj);
        
        if (typeof obj === 'string') {
            const m = obj.match(/https?:\/\/[^\s"'{}]+/);
            return m ? m[0] : null;
        }
        if (Array.isArray(obj)) {
            for (const item of obj) {
                const found = findAnyUrlInObject(item, visited, depth + 1);
                if (found) return found;
            }
        } else if (typeof obj === 'object') {
            for (const key of Object.keys(obj)) {
                const val = obj[key];
                if (typeof val === 'string') {
                    const m = val.match(/https?:\/\/[^\s"'{}]+/);
                    if (m) return m[0];
                }
                const found = findAnyUrlInObject(val, visited, depth + 1);
                if (found) return found;
            }
        }
        return null;
    };

    try {
        if (isVideo) {
            // For videos, explicitly set resource_type to 'video'
            options.resource_type = 'video';

            // If file is large, use chunked upload to avoid 413 errors from Cloudinary
            // Threshold here is 50MB (adjustable)
            const LARGE_FILE_THRESHOLD = 50 * 1024 * 1024;
            if (fileSize > LARGE_FILE_THRESHOLD && typeof cloudinary.uploader.upload_large === 'function') {
                // chunk size ~6MB (adjustable)
                options.chunk_size = 6000000;
                console.log(`Using upload_large for video (size=${fileSize}). Options:`, options);
                try {
                    const resultLarge = await cloudinary.uploader.upload_large(filePath, options);
                    console.log("upload_large raw result type:", typeof resultLarge, "has secure_url:", !!resultLarge?.secure_url);
                    // Check if result is actually a response object (not a stream)
                    if (resultLarge && typeof resultLarge === 'object' && (resultLarge.secure_url || resultLarge.public_id || resultLarge.resource_type)) {
                        const foundUrl = resultLarge?.secure_url || resultLarge?.url || 
                            (resultLarge?.eager?.[0]?.secure_url) || (resultLarge?.eager?.[0]?.url) ||
                            findAnyUrlInObject(resultLarge);
                        if (foundUrl && !resultLarge.secure_url) {
                            resultLarge.secure_url = foundUrl;
                            console.log("Found URL via recursive search for upload_large:", foundUrl);
                        }
                        return resultLarge;
                    } else {
                        console.warn("upload_large returned unexpected object type. Falling back to standard upload.");
                        throw new Error("upload_large returned stream-like object, not upload result");
                    }
                } catch (uploadLargeErr) {
                    console.warn("upload_large failed or returned invalid result:", uploadLargeErr?.message);
                    // Fall through to standard upload
                }
            }

            // fallback to normal upload for smaller videos
            console.log(`Using standard upload for video (size=${fileSize}). Options:`, options);
            const result = await cloudinary.uploader.upload(filePath, options);
            console.log("Standard upload raw result type:", typeof result, "has secure_url:", !!result?.secure_url, "has public_id:", !!result?.public_id);
            // Validate that we got an actual upload response, not a stream
            if (!result || typeof result !== 'object' || (!result.secure_url && !result.public_id && !result.resource_type)) {
                console.error("Standard upload returned invalid/stream object. Result keys:", Object.keys(result || {}));
                throw new Error("Standard upload did not return a valid response object");
            }
            const foundUrl = result?.secure_url || result?.url || 
                (result?.eager?.[0]?.secure_url) || (result?.eager?.[0]?.url) ||
                findAnyUrlInObject(result);
            if (foundUrl && !result.secure_url) {
                result.secure_url = foundUrl;
                console.log("Found URL via recursive search for standard upload:", foundUrl);
            }
            return result;
        }

        // Non-video files (images etc.)
        options.resource_type = 'image';
        const imgResult = await cloudinary.uploader.upload(filePath, options);
        const foundUrl = imgResult?.secure_url || imgResult?.url || 
            (imgResult?.eager?.[0]?.secure_url) || (imgResult?.eager?.[0]?.url) ||
            findAnyUrlInObject(imgResult);
        if (foundUrl && !imgResult.secure_url) {
            imgResult.secure_url = foundUrl;
            console.log("Found URL via recursive search for image upload:", foundUrl);
        }
        return imgResult;
    } catch (err) {
        console.error('Cloudinary upload failed:', err && err.message ? err.message : err);

        // If Cloudinary returns 413 (payload too large) or UnexpectedResponse, try upload_stream fallback
        const is413 = err && (err.http_code === 413 || (err.name && err.name === 'UnexpectedResponse') );
        if (is413) {
            console.warn('Attempting stream upload fallback due to 413 / UnexpectedResponse...');
            try {
                return await new Promise((resolve, reject) => {
                    const readStream = fs.createReadStream(filePath);
                    const uploadStream = cloudinary.uploader.upload_stream(options, (uploadErr, result) => {
                        if (uploadErr) return reject(uploadErr);
                        resolve(result);
                    });
                    readStream.on('error', (rsErr) => {
                        reject(rsErr);
                    });
                    readStream.pipe(uploadStream);
                });
            } catch (streamErr) {
                console.error('Stream upload fallback failed:', streamErr);
                throw streamErr;
            }
        }

        throw err;
    }

      
    

}