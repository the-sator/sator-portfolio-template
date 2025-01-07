import { NextRequest, NextResponse } from "next/server";
import { uploadImageToS3 } from "@/lib/s3Client";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob | null;
    const name = formData.get("name") as string;
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 },
      );
    }

    const mimeType = file.type;
    const fileExtension = mimeType.split("/")[1];

    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await uploadImageToS3(
      buffer,
      name + "." + fileExtension,
      mimeType,
    );

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Error uploading image:", error);
    NextResponse.json({ message: "Error uploading image" });
  }
}
