import mongoose, {Document} from "mongoose";

export interface User extends Document {
    name: string;
    passportId: string;
    password: string;
    grades: [];
    role: string;
}

const userSchema: mongoose.Schema<User> = new mongoose.Schema<User>({
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