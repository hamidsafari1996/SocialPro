// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// export async function GET(request: Request) {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//   }

//   // اکنون می‌توانید از session.user.id استفاده کنید
//   const userData = {
//     id: session.user?.id, // استفاده از id
//     name: session.user?.name,
//     email: session.user?.email,
//     avatarPreview: '/uploads/avatar.jpg',
//     imagePreview: '/uploads/image.jpg',
//   };

//   return NextResponse.json(userData);
// }
