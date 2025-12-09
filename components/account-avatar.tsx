// Avatar badge that adapts to theme tokens

export function AccountAvatar({ className }: { className?: string }) {
  return (
    <svg
      width='96'
      height='96'
      viewBox='0 0 96 96'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id='avatarOuter' x1='48' y1='0' x2='48' y2='96' gradientUnits='userSpaceOnUse'>
          <stop stopColor='var(--text-soft-400)' stopOpacity='0.32' />
          <stop offset='1' stopColor='var(--text-soft-400)' stopOpacity='0' />
        </linearGradient>
        <filter
          id='avatarShadow'
          x='14'
          y='15'
          width='68'
          height='68'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='1' />
          <feGaussianBlur stdDeviation='1' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0.0392157 0 0 0 0 0.0509804 0 0 0 0 0.0784314 0 0 0 0.03 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
        </filter>
      </defs>

      {/* Subtle outer halo */}
      <circle cx='48' cy='48' r='48' fill='url(#avatarOuter)' />

      {/* Inner disc with stroke using theme tokens */}
      <g filter='url(#avatarShadow)'>
        <circle cx='48' cy='48' r='32' fill='var(--bg-white-0)' />
        <circle cx='48' cy='48' r='31.5' stroke='var(--stroke-soft-200)' />
      </g>

      {/* User glyph */}
      <path
        d='M50.3999 50.7022V59.9998H38.3999C38.3995 58.5345 38.7346 57.0885 39.3795 55.7727C40.0243 54.4569 40.9618 53.3061 42.1202 52.4086C43.2785 51.5112 44.6269 50.8908 46.0621 50.595C47.4973 50.2992 48.9811 50.3359 50.3999 50.7022V50.7022ZM47.9999 49.1998C44.0219 49.1998 40.7999 45.9778 40.7999 41.9998C40.7999 38.0218 44.0219 34.7998 47.9999 34.7998C51.9779 34.7998 55.1999 38.0218 55.1999 41.9998C55.1999 45.9778 51.9779 49.1998 47.9999 49.1998ZM55.1999 53.9998V50.3998H57.5999V53.9998H61.1999V56.3998H57.5999V59.9998H55.1999V56.3998H51.5999V53.9998H55.1999Z'
        fill='var(--text-soft-400)'
      />
    </svg>
  );
}

export default AccountAvatar;
