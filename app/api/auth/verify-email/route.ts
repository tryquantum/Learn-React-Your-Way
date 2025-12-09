import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        error: 'invalid_token',
        message: 'Token is invalid or expired',
      },
      { status: 400 },
    );
  }

  if (token.includes('expired')) {
    return NextResponse.json(
      {
        success: false,
        error: 'invalid_token',
        message: 'Token is invalid or expired',
      },
      { status: 400 },
    );
  }

  if (token.includes('verified')) {
    return NextResponse.json(
      {
        success: false,
        error: 'already_verified',
        message: 'Email already verified',
      },
      { status: 400 },
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Email verified successfully',
    data: {
      user_id: 'mock-user-id',
      email: 'user@example.com',
      verified_at: new Date().toISOString(),
    },
  });
}
