import Link from 'next/link';

export function Footer() {
  return (
    <footer className='border-t border-stroke-soft-200 bg-bg-weak-50'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12'>
        <div className='grid gap-8 md:grid-cols-4'>
          <div className='space-y-3'>
            <h4 className='text-label-md font-semibold text-text-strong-950'>Product</h4>
            <ul className='space-y-2 text-paragraph-sm text-text-sub-600'>
              <li>
                <Link href='#features' className='hover:text-text-strong-950 transition-colors'>
                  Features
                </Link>
              </li>
              <li>
                <Link href='#pricing' className='hover:text-text-strong-950 transition-colors'>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href='/security' className='hover:text-text-strong-950 transition-colors'>
                  Security
                </Link>
              </li>
              <li>
                <Link href='/roadmap' className='hover:text-text-strong-950 transition-colors'>
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-3'>
            <h4 className='text-label-md font-semibold text-text-strong-950'>Company</h4>
            <ul className='space-y-2 text-paragraph-sm text-text-sub-600'>
              <li>
                <Link href='/about' className='hover:text-text-strong-950 transition-colors'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='/blog' className='hover:text-text-strong-950 transition-colors'>
                  Blog
                </Link>
              </li>
              <li>
                <Link href='/press' className='hover:text-text-strong-950 transition-colors'>
                  Press Kit
                </Link>
              </li>
              <li>
                <Link href='/contact' className='hover:text-text-strong-950 transition-colors'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-3'>
            <h4 className='text-label-md font-semibold text-text-strong-950'>Resources</h4>
            <ul className='space-y-2 text-paragraph-sm text-text-sub-600'>
              <li>
                <Link href='/help' className='hover:text-text-strong-950 transition-colors'>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href='/api-docs' className='hover:text-text-strong-950 transition-colors'>
                  API Docs
                </Link>
              </li>
              <li>
                <Link href='/integrations' className='hover:text-text-strong-950 transition-colors'>
                  Integrations
                </Link>
              </li>
              <li>
                <Link href='/status' className='hover:text-text-strong-950 transition-colors'>
                  Status Page
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-3'>
            <h4 className='text-label-md font-semibold text-text-strong-950'>Legal</h4>
            <ul className='space-y-2 text-paragraph-sm text-text-sub-600'>
              <li>
                <Link href='/privacy' className='hover:text-text-strong-950 transition-colors'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href='/terms' className='hover:text-text-strong-950 transition-colors'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href='/security-policy' className='hover:text-text-strong-950 transition-colors'>
                  Security Policy
                </Link>
              </li>
              <li>
                <Link href='/dpa' className='hover:text-text-strong-950 transition-colors'>
                  DPA
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='flex flex-col gap-3 text-paragraph-sm text-text-sub-600 md:flex-row md:items-center md:justify-between'>
          <div className='space-y-1'>
            <p>© 2025 Growtiva. All rights reserved.</p>
            <p>Made with ❤️ for solopreneurs everywhere.</p>
            <p>Status: All systems operational ✓</p>
            <p>Support: support@growtiva.com</p>
          </div>
          <div className='flex flex-wrap gap-3 text-text-strong-950'>
            <Link href='https://twitter.com/growtiva' className='hover:text-primary-base transition-colors'>
              Twitter
            </Link>
            <Link href='https://linkedin.com/company/growtiva' className='hover:text-primary-base transition-colors'>
              LinkedIn
            </Link>
            <Link href='https://instagram.com/growtiva' className='hover:text-primary-base transition-colors'>
              Instagram
            </Link>
            <Link href='https://tiktok.com/@growtiva' className='hover:text-primary-base transition-colors'>
              TikTok
            </Link>
            <Link href='https://youtube.com/@growtiva' className='hover:text-primary-base transition-colors'>
              YouTube
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
