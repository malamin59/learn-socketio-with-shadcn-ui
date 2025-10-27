"use server";

import bcrypt from "bcryptjs";
import crypto from "crypto";
import dbConnect, { collectionNameOb } from "@/lib/dbConnect";
import sendVerificationEmail from "@/lib/sendEmail";
export const registerUser = async (payload) => {
  try {
    const userCollection = await dbConnect(collectionNameOb.userCollection);
    const { name, email, password } = payload;

    if (!name || !email || !password) {
      return { success: false, message: "All fields are required." };
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    payload.password = hashPassword;
    const userData = {
      ...payload,
      password: hashPassword,
      isVerified: false,
      verificationToken,
      createdAt: new Date().toLocaleString(),
    };
    const existingUser = await userCollection.findOne({ email });

    if (existingUser) {
      return { success: false, message: "User already exists!" };
    }
    const result = await userCollection.insertOne(userData);
    //send verificationEmail
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}&email=${email}`;
    await sendVerificationEmail(email, verificationUrl);
    // ???

    return {
      success: true,
      acknowledged: result.acknowledged,
      insertedId: result.insertedId.toString(),
      message:
        "User registered successfully! Please check your email to verify.",
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "Failed to register user." };
  }
};
