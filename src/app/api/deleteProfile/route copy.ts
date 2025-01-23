// File: /pages/api/delete-image.ts
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: true, // Aktifkan bodyParser bawaan Next.js
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { imageName } = req.body;

    if (!imageName) {
      return res.status(400).json({ error: "Image name is required" });
    }

    try {
      const imagePath = path.join(
        process.cwd(),
        "public/images/profile",
        imageName
      );

      // Hapus file gambar dari server
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        return res.status(200).json({ message: "Image deleted successfully" });
      } else {
        return res.status(404).json({ error: "Image not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete the image" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
