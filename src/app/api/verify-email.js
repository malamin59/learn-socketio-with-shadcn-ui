import dbConnect, { collectionNameOb } from "@/lib/dbConnect";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { token, email } = req.query;
  const userCollection = await dbConnect(collectionNameOb.userCollection);

  const user = await userCollection.findOne({ email, verificationToken: token });
  if (!user) return res.status(400).json({ message: "Invalid token or email" });

  await userCollection.updateOne(
    { email },
    { $set: { isVerified: true }, $unset: { verificationToken: "" } }
  );

  res.status(200).json({ message: "Email verified successfully!" });
}
