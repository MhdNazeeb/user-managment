import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            trim: true,
            required: true,
            minlength: [6],
        },
        isBanned: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("users", userSchema);
export default userModel;