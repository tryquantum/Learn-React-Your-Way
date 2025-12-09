import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Growtiva - AI Marketing Team for Solopreneurs';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: 'linear-gradient(to right, #22c55e, #16a34a, #15803d)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Growtiva
          </div>
          <div
            style={{
              fontSize: 48,
              textAlign: 'center',
              opacity: 0.9,
            }}
          >
            AI Marketing Team for Solopreneurs
          </div>
          <div
            style={{
              fontSize: 32,
              textAlign: 'center',
              opacity: 0.8,
              marginTop: '20px',
            }}
          >
            Grow like a team of 5—without the payroll
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
