"use server";

import dbConnect, { collectionNameOb } from "@/lib/dbConnect";

export const registerUser = async (payload) => {
  try {
    const userCollection = await dbConnect(collectionNameOb.userCollection);
    const { name, email, password } = payload;

    if (!name || !email || !password) {
      return { success: false, message: "All fields are required." };
    }

    const date = new Date();
    const userData = {
      ...payload,
      createAt: date.toLocaleString(),
    };
    const existingUser = await userCollection.findOne({ email });

    if (existingUser) {
      return { success: false, message: "User already exists!" };
    }

    const result = await userCollection.insertOne(userData);

    return {
      success: true,
      acknowledged: result.acknowledged,
      insertedId: result.insertedId.toString(),
      message: "User registered successfully!",
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "Failed to register user." };
  }
};
