import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { message } = req.body;

    // Implement your logic to save the message
    const success = await saveMessage(message);

    if (success) {
      res.status(200).json({ success: true });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Failed to post message" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function saveMessage(message: string) {
  // Implement your database logic here
  return true; // Replace with actual database insertion
}
