import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { email } = body ?? {};

  // Simulate latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (typeof email === 'string' && email.toLowerCase().includes('taken')) {
    return NextResponse.json(
      {
        success: false,
        error: 'email_already_exists',
        message: 'This email is already registered',
      },
      { status: 409 },
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Account created successfully',
    data: {
      user_id: 'mock-user-id',
      email,
      verification_email_sent: true,
      verification_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
  });
}
