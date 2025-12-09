'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import * as SegmentedControl from '@/components/ui/segmented-control';
import { RiEqualizer3Fill, RiMoonLine, RiSunLine } from '@remixicon/react';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering on the server to prevent hydration flicker and keep the switch in sync.
  if (!mounted) {
    return <div aria-hidden className='h-7 w-[126px]' />;
  }

  // Track the user's selection (light/dark/system) for the control; resolvedTheme
  // is still used for display but we keep the active tab on the chosen mode.
  const currentTheme = theme ?? 'system';

  return (
    <SegmentedControl.Root value={currentTheme} onValueChange={setTheme}>
      <SegmentedControl.List>
        <SegmentedControl.Trigger value='light' className='aspect-square'>
          <RiSunLine className='size-4' />
        </SegmentedControl.Trigger>
        <SegmentedControl.Trigger value='dark' className='aspect-square'>
          <RiMoonLine className='size-4' />
        </SegmentedControl.Trigger>
        <SegmentedControl.Trigger value='system' className='aspect-square'>
          <RiEqualizer3Fill className='size-4' />
        </SegmentedControl.Trigger>
      </SegmentedControl.List>
    </SegmentedControl.Root>
  );
}
