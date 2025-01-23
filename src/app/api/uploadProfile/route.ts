import { type NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { writeFile } from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const generateFileName = (originalName: string): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = date.getMilliseconds().toString().padStart(3, "0");

  const extname = path.extname(originalName);
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}-profile${extname}`;
};

const uploadDirectory = path.join(process.cwd(), "public", "images", "profile");

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    await fs.mkdir(uploadDirectory, { recursive: true });

    const originalFilename = file.name;
    const newFilename = generateFileName(originalFilename);
    const filePath = path.join(uploadDirectory, newFilename);

    const buffer: any = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    return NextResponse.json({
      message: "File uploaded successfully",
      namefile: newFilename,
    });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ error: "Error saving file" }, { status: 500 });
  }
}
