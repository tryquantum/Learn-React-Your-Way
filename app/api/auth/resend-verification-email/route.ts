import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { email } = body ?? {};

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!email) {
    return NextResponse.json(
      {
        success: false,
        error: 'user_not_found',
        message: 'User not found',
      },
      { status: 404 },
    );
  }

  if (typeof email === 'string' && email.toLowerCase().includes('rate')) {
    return NextResponse.json(
      {
        success: false,
        error: 'rate_limited',
        message: 'Too many resend requests. Try again later.',
        retry_after: 60,
      },
      { status: 429 },
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Verification email sent',
    data: {
      email,
      resent_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
  });
}
