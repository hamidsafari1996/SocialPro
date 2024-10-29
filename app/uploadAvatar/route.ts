// app/uploadAvatar/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // دریافت فایل از درخواست (FormData)
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded or invalid file' }, { status: 400 });
    }

    // در این مثال به صورت فرضی یک URL بازمی‌گردانیم
    // در سناریوی واقعی، فایل باید به یک سرور ذخیره‌سازی یا فضای ابری مانند S3 آپلود شود
    const fileUrl = '/images/04.jpg'; // آدرس فرضی بازگشتی برای تست

    return NextResponse.json({ fileUrl }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process the request' }, { status: 500 });
  }
}