// Simple mock implementation for client-side
export async function uploadImage(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  // In development, return a mock URL
  if (import.meta.env.DEV) {
    return `https://picsum.photos/seed/${filename}/800/600`;
  }

  // In production, this would use AWS S3
  // For now, return a mock URL
  return `https://picsum.photos/seed/${filename}/800/600`;
}