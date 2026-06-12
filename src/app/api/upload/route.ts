import { NextRequest, NextResponse } from 'next/server';
import { uploadImage, getOptimizedUrl, getSquareCropUrl } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert File object to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload image to Cloudinary
    const uploadResult = await uploadImage(buffer);

    // Generate optimized & cropped URLs using Cloudinary configuration
    const optimizedUrl = getOptimizedUrl(uploadResult.public_id);
    const squareCropUrl = getSquareCropUrl(uploadResult.public_id);

    return NextResponse.json({
      success: true,
      originalUrl: uploadResult.secure_url,
      optimizedUrl,
      squareCropUrl,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      bytes: uploadResult.bytes,
    });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
