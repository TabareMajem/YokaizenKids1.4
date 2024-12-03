import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { logger } from '../../config/logger';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

export async function uploadImage(
  imageBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `manga/${fileName}`,
      Body: imageBuffer,
      ContentType: contentType
    });

    await s3Client.send(command);
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/manga/${fileName}`;
  } catch (error) {
    logger.error('S3 upload error:', error);
    throw new Error('Failed to upload image');
  }
}

export async function getSignedImageUrl(fileName: string): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `manga/${fileName}`
    });

    return getSignedUrl(s3Client, command, { expiresIn: 3600 });
  } catch (error) {
    logger.error('S3 signed URL generation error:', error);
    throw new Error('Failed to generate signed URL');
  }
}