const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:4000/api/v1';

// Mock data
const TEST_EMAIL = `instructor_${Date.now()}@test.com`;
const TEST_PASSWORD = 'password123';
const TEST_IMAGE_PATH = path.join(__dirname, 'test_image.jpg'); // Needs to exist
const TEST_VIDEO_PATH = path.join(__dirname, 'test_video.mp4'); // Needs to exist

// Helper to create dummy files if they don't exist
function createDummyFiles() {
    if (!fs.existsSync(TEST_IMAGE_PATH)) {
        fs.writeFileSync(TEST_IMAGE_PATH, 'dummy image content');
    }
    if (!fs.existsSync(TEST_VIDEO_PATH)) {
        fs.writeFileSync(TEST_VIDEO_PATH, 'dummy video content');
    }
}

async function runVerification() {
    createDummyFiles();
    let token = '';
    let courseId = '';
    let sectionId = '';
    let subsectionId = '';

    try {
        console.log('1. Signup/Login...');
        // Try login first, if fails, signup
        try {
            const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
                email: TEST_EMAIL,
                password: TEST_PASSWORD
            });
            token = loginRes.data.token;
            console.log('Logged in successfully.');
        } catch (e) {
            console.log('Login failed, trying signup...');
            await axios.post(`${BASE_URL}/auth/sendotp`, { email: TEST_EMAIL });
            // Assuming OTP is not checked strictly or we can bypass/mock it? 
            // Wait, the backend requires OTP. 
            // For verification, we might need a pre-existing user or a way to get OTP.
            // Let's assume we can use a hardcoded OTP or disable OTP check for test?
            // Or better, let's just try to login with a known user if possible.
            // Since I don't have a known user, I'll try to find one in the DB or just fail here if I can't signup.
            // Actually, I can't easily signup without OTP.
            // I'll check if there's a way to bypass OTP or if I can use a test account.

            // ALTERNATIVE: I will assume the user has a way to provide a token or I'll just try to hit the endpoints if I can mock auth.
            // But wait, I can't mock auth easily without changing code.

            // Let's try to find a user in the DB? I can't access DB directly easily.

            // Let's try to create a user directly using the model if I can run a script on the server?
            // Yes, I can run a script that imports the User model and creates a user!

            console.log("Cannot signup without OTP. Please provide a valid token or allow me to create a user via script.");
            return;
        }

        // ... rest of the script ...
    } catch (error) {
        console.error('Verification failed:', error.response ? error.response.data : error.message);
    }
}

// runVerification();
