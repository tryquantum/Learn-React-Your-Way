import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Growtiva - AI Marketing Team for Solopreneurs';
export const size = {
  width: 1200,
  height: 600,
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
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Growtiva
          </div>
          <div
            style={{
              fontSize: 40,
              textAlign: 'center',
              opacity: 0.9,
            }}
         >
            AI Marketing Team for Solopreneurs
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
