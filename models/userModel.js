import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "you have to enter a name"]
    },
    passportId: {
        type: String,
        required: true,
        length: 9,
        match: [/\d{9}/, "you have to enter your passportID with only digits with length of 9 digits"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "you have to enter password"],
        trim: true
    },
    grades: [],
    role: {
        type: String,
        required: [true, "please enter your role"],
        enum: ["student", "teacher"]
    }
});
export default mongoose.model("User", userSchema);
