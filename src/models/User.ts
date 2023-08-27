import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Document {
  email: string;
  password: string;
  username: string;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// Method to compare password with hashed password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
