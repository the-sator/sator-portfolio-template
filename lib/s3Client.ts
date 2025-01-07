import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import sharp from "sharp";
const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function uploadImageToS3(
  file: Buffer,
  fileName: string,
  type: string,
): Promise<string> {
  const resizedImageBuffer = await sharp(file)
    .resize(1000)
    .png({ quality: 80 }) // Specify your desired width or height for resizing
    .toBuffer();

  const key = `${Date.now()}-${fileName}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: key,
    Body: resizedImageBuffer,
    ContentType: type, // Change the content type accordingly
    ACL: "public-read" as ObjectCannedACL,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  const getCommand = new GetObjectCommand(params);
  await getSignedUrl(s3Client, getCommand);

  return `https://${process.env.AWS_PUBLIC_BUCKET_URL}/${key}`;
}
