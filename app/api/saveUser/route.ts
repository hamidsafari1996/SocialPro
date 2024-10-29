// // app/api/saveUser/route.ts
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   try {
//     const data = await request.json();
//     console.log("Received data:", data);

//     // فرضاً اینجا داده‌ها را ذخیره می‌کنید (به دیتابیس یا هر جای دیگر)
//     // مثلا: await db.collection('users').updateOne({ id: userId }, { $set: data });

//     return NextResponse.json({ message: 'User data saved successfully' }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: 'Error saving user data', error }, { status: 500 });
//   }
// }