import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

/**
 * Uploads an image Buffer to Cloudinary
 * @param buffer File buffer to upload
 * @param folder Cloudinary folder name
 * @returns Promise resolving to Cloudinary upload result
 */
export async function uploadImage(buffer: Buffer, folder = 'mb-website'): Promise<any> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}

/**
 * Generates an optimized delivery URL for a given public ID
 */
export function getOptimizedUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto',
  });
}

/**
 * Generates a square cropped/resized image URL
 */
export function getSquareCropUrl(publicId: string, size = 500): string {
  return cloudinary.url(publicId, {
    crop: 'fill',
    gravity: 'auto',
    width: size,
    height: size,
  });
}
