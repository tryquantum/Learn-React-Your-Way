export default function Loading() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-bg-white-0'>
      <div className='space-y-4 text-center'>
        <div className='flex h-16 w-16 mx-auto items-center justify-center'>
          <div className='h-16 w-16 animate-spin rounded-full border-4 border-bg-weak-50 border-t-primary-base' />
        </div>
        <div className='space-y-2'>
          <h2 className='text-title-h5 text-text-strong-950'>Loading...</h2>
          <p className='text-paragraph-sm text-text-sub-600'>Please wait while we load your content</p>
        </div>
      </div>
    </div>
  );
}
