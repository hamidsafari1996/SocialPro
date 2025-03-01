// app/uploadAvatar/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Extract the form data from the incoming request
    const formData = await req.formData();
    // Get the file from the form data (expected field name is 'file')
    const file = formData.get('file');

    // Validate that a file was provided and it's a valid File object
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'No file uploaded or invalid file' }, 
        { status: 400 }
      );
    }

    // TODO: Implement actual file upload logic
    // Currently returns a hardcoded file URL
    const fileUrl = '/images/04.jpg';

    // Return the file URL on successful upload
    return NextResponse.json({ fileUrl }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the upload process
    return NextResponse.json(
      { error: 'Failed to process the request' }, 
      { status: 500 }
    );
  }
}