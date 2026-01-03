const mongoose = require('mongoose');
const mailsender = require('../utils/mailsennder');
const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,

    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    },

});

// function to send email
async function senndverificationemail(email, otp) {
    try {
        const mailresponse = await mailsender(email, "verification email by study notion", otp);
        console.log("email send succesfully", mailresponse);
    }
    catch (error) {
        console.log("error ocuuered while sending email", error);

    }

}

OtpSchema.pre("save", async function (next) {
    await senndverificationemail(this.email, this.otp);
    next();
})


module.exports = mongoose.model("Otp", OtpSchema);