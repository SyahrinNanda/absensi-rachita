import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    // Parse body JSON dari request
    const { imageName } = await request.json();

    if (!imageName) {
      return NextResponse.json(
        { error: "Image name is required" },
        { status: 400 }
      );
    }

    const imagePath = path.join(
      process.cwd(),
      "public/images/profile",
      imageName
    );

    // Cek apakah file ada, lalu hapus
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      return NextResponse.json(
        { message: "Image deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete the image" },
      { status: 500 }
    );
  }
}
