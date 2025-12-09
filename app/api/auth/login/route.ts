import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body ?? {};

  // Simulate latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Mock validation - accept demo@example.com with any password
  if (!email || !password) {
    return NextResponse.json(
      {
        success: false,
        error: 'invalid_credentials',
        message: 'Invalid email or password',
      },
      { status: 401 },
    );
  }

  // Simulate successful login for demo@example.com or any email with password '123456'
  if (email.toLowerCase() === 'demo@example.com' || password === '123456') {
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user_id: 'mock-user-id',
        email,
        name: 'John Doe',
        verified: true,
      },
    });
  }

  // Default: invalid credentials
  return NextResponse.json(
    {
      success: false,
      error: 'invalid_credentials',
      message: 'Invalid email or password',
    },
    { status: 401 },
  );
}
