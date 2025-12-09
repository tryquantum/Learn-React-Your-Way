import Link from 'next/link';
import { AnnouncementBanner } from '@/components/AnnouncementBanner';
import { BrandShowcase } from '@/components/BrandShowcase';
import { HeroSection } from '@/components/HeroSection';
import { NavigationHeader } from '@/components/NavigationHeader';
import * as Button from '@/components/ui/button';
import * as Badge from '@/components/ui/badge';
import { cn } from '@/utils/cn';
import { RiArrowRightUpLine, RiCheckLine, RiStarFill } from '@remixicon/react';

export default function Home() {
  const painPoints = [
    {
      title: 'Content Creation Takes FOREVER',
      description:
        "Staring at a blank page for 2 hours just to write one social post? You're not alone. The average solopreneur spends 8+ hours per week on content creation alone.",
      icon: '⏰',
    },
    {
      title: "You're Doing Everything Yourself",
      description:
        "Marketing, copywriting, design, email sequences... It's exhausting. You need a team, but you can't afford to hire one.",
      icon: '😫',
    },
    {
      title: "Your Marketing Isn't Strategic",
      description:
        "You post randomly, hope something sticks, and miss opportunities. Without a strategy, you're leaving money on the table.",
      icon: '🎯',
    },
  ];

  const valueProps = [
    {
      title: 'Done-For-You Content Blueprints',
      description:
        '35+ industry-specific kits for social, email, landing pages, and more. Copy, customize, and post—no blank page syndrome.',
      icon: '📚',
      cta: 'Explore Content Vault',
    },
    {
      title: 'Professional Copy in Seconds',
      description:
        'Say what you want to say; your AI team writes it perfectly for every channel with niche-aware tone.',
      icon: '✨',
      cta: 'Try Generator',
      stat: '3x faster than writing manually',
    },
    {
      title: 'Build Your Email List (No Coding)',
      description:
        'Pre-built sequences for welcomes, launches, abandoned carts, and follow-ups. Automate without complex tools.',
      icon: '📧',
      cta: 'Explore Email Templates',
    },
    {
      title: 'Post Everywhere. Once.',
      description:
        'Create once, schedule to Instagram, Facebook, LinkedIn, TikTok, X, and more. Formatting handled for you.',
      icon: '📱',
      cta: 'Connect Your Socials',
    },
    {
      title: "Know What's Working",
      description:
        'See which posts engage and which emails convert. Make data-driven moves, not guesses.',
      icon: '📊',
      cta: 'View Analytics',
    },
  ];

  const steps = [
    { title: 'Sign Up (1 min)', copy: 'Email + password. Done. No credit card required.' },
    { title: 'Pick Your Industry (1 min)', copy: 'We tailor templates for coaches, ecommerce, freelancers, real estate, and more.' },
    { title: 'Create Your First Post (3 min)', copy: 'Answer 3 questions. Your AI team writes professional copy. Aha moment unlocked.' },
    { title: 'Connect Your Socials (1 min)', copy: 'One-click connections to start scheduling immediately.' },
    { title: 'Activate Automation (1 min)', copy: 'Set it and forget it. Your AI team creates and posts while you sleep.' },
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: "Sarah's Fitness Studio — Personal Training",
      quote:
        'I was spending 10 hours per week on social. Growtiva cut that to 1 hour. Leads doubled. Game-changer for solo coaches.',
      result: '2x lead generation in 30 days',
    },
    {
      name: 'Marcus Chen',
      role: 'Freelance UI/UX Designer',
      quote:
        'Growtiva gave me portfolio content, case studies, and thought leadership posts. I now attract better clients who know my work.',
      result: '5 high-value clients acquired',
    },
    {
      name: 'Jennifer Rodriguez',
      role: 'Sustainable Beauty Ecommerce',
      quote:
        'Product descriptions, social copy, email sequences—converted immediately. AOV up 30% and I save 6+ hours weekly.',
      result: '30% increase in average order value',
    },
    {
      name: 'David Thompson',
      role: 'Real Estate — Dallas Metro',
      quote:
        'Consistent, high-quality content helped me stand out. Followers up 400% and buyer inquiries at an all-time high.',
      result: '400% growth in social followers',
    },
  ];

  const pricing = [
    {
      name: 'Free',
      price: '$0/mo',
      description: 'Everything you need to get started.',
      features: [
        '3 AI generations per day',
        '35+ industry content templates',
        '2 social media connections',
        'Email sequence templates (manual send)',
        'Basic analytics',
        'Community support',
        'Activation tracker',
      ],
      cta: 'Start Free',
      badge: 'Starter',
    },
    {
      name: 'Pro',
      price: '$29/mo',
      description: 'For solopreneurs ready to scale.',
      features: [
        'Unlimited AI generations',
        'All content kits + 10 new monthly',
        'Unlimited social connections',
        'Email automation & scheduling',
        'Multi-platform auto-posting',
        'Advanced analytics & A/B testing',
        'Content calendar',
        'Priority support',
        'Brand kit customization',
      ],
      cta: 'Start Pro Free Trial',
      badge: 'Most popular – save with yearly',
      highlight: true,
    },
    {
      name: 'Premium',
      price: '$79/mo',
      description: 'For agencies and growing teams.',
      features: [
        'Everything in Pro',
        'Team collaboration (invite 3)',
        'API access for custom integrations',
        'Lead magnet builder',
        'Sales funnel templates',
        'Dedicated success manager',
        'Monthly strategy calls',
        'Custom training',
      ],
      cta: 'Start Premium Free Trial',
      badge: 'Best value – yearly savings',
    },
  ];

  const faqs = [
    {
      q: 'Do I really need an AI team?',
      a: 'If you manage marketing, content, email, and social alone, Growtiva cuts that work from 8-10 hours weekly to 1-2 hours.',
    },
    {
      q: "What if my industry isn't listed?",
      a: 'We cover beauty, fitness, ecommerce, freelance, real estate, coaching, and local services. Email support@growtiva.com if you need another.',
    },
    {
      q: 'Can I use Growtiva for my team?',
      a: 'Yes. Premium includes 3 teammates; contact us for agency pricing if you need more.',
    },
    {
      q: 'Is the AI content original?',
      a: '100% original to your brief, tone, and industry. You own everything generated.',
    },
    {
      q: 'How does the free trial work?',
      a: '14-day Pro access, no credit card. After 14 days, downgrade to Free or stay Pro. No charges unless you upgrade.',
    },
    {
      q: "What if Growtiva doesn't work for me?",
      a: '30-day money-back guarantee. If you’re not seeing value, we refund you. Simple.',
    },
  ];

  return (
    <div className='flex flex-1 flex-col bg-bg-white-0 text-text-strong-950'>
      <AnnouncementBanner />
      <NavigationHeader />
      <main className='flex flex-1 flex-col'>
        <HeroSection />
        <BrandShowcase />

         {/* Pain Points */}
        <section
          id='features'
          className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:gap-12 md:py-16'
        >
          <div className='max-w-3xl space-y-3'>
            <p className='text-subheading-sm uppercase tracking-[0.2em] text-text-sub-600'>
              The Solopreneur Problem
            </p>
            <h2 className='text-title-h3 text-text-strong-950'>
              Doing everything yourself isn’t sustainable.
            </h2>
            <p className='text-paragraph-md text-text-sub-600'>
              Content creation, strategy, and posting shouldn’t consume your week. Growtiva
              removes the grind so you can focus on the work that grows your business.
            </p>
          </div>
          <div className='grid gap-4 md:grid-cols-3'>
            {painPoints.map((item) => (
              <div
                key={item.title}
                className='flex h-full flex-col gap-3 rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-custom-sm'
              >
                <div className='text-3xl'>{item.icon}</div>
                <h3 className='text-title-h6 text-text-strong-950'>{item.title}</h3>
                <p className='text-paragraph-sm text-text-sub-600'>{item.description}</p>
              </div>
            ))}
          </div>
          <p className='text-paragraph-md text-text-strong-950'>
            What if you had an AI team that handled all of this for you? It&apos;s not a dream. It&apos;s
            Growtiva.
          </p>
        </section>

        {/* Value Props */}
        <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:gap-12 md:py-16'>
          <div className='max-w-3xl space-y-3'>
            <p className='text-subheading-sm uppercase tracking-[0.2em] text-text-sub-600'>
              Meet your AI marketing team
            </p>
            <h2 className='text-title-h3 text-text-strong-950'>
              Grow like a team of 5—without the payroll.
            </h2>
            <p className='text-paragraph-md text-text-sub-600'>
              Industry-specific templates, AI copy generation, automated workflows, and posting
              across every channel from one dashboard.
            </p>
          </div>
          <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
            {valueProps.map((item) => (
              <div
                key={item.title}
                className='flex h-full flex-col gap-3 rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-custom-sm'
              >
                <div className='text-2xl'>{item.icon}</div>
                <h3 className='text-title-h6 text-text-strong-950'>{item.title}</h3>
                <p className='text-paragraph-sm text-text-sub-600'>{item.description}</p>
                <div className='mt-auto flex items-center gap-2 text-label-sm text-primary-base'>
                  {item.cta}
                  <RiArrowRightUpLine className='size-4' />
                </div>
                {item.stat ? (
                  <span className='text-label-xs font-medium text-text-sub-600'>{item.stat}</span>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section
          id='help'
          className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:gap-12 md:py-16'
        >
          <div className='max-w-3xl space-y-3'>
            <p className='text-subheading-sm uppercase tracking-[0.2em] text-text-sub-600'>
              Get your first result in 7 minutes
            </p>
            <h2 className='text-title-h3 text-text-strong-950'>No complicated setup. Start today.</h2>
          </div>
          <div className='grid gap-4 md:grid-cols-3'>
            {steps.map((step, index) => (
              <div
                key={step.title}
                className='flex h-full flex-col gap-2 rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-custom-sm'
              >
                <div className='flex items-center gap-2 text-label-sm text-primary-base'>
                  <Badge.Root variant='lighter' color='green' size='small'>
                    Step {index + 1}
                  </Badge.Root>
                  <span className='text-text-sub-600'>{step.title}</span>
                </div>
                <p className='text-paragraph-sm text-text-strong-950'>{step.copy}</p>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap items-center gap-3'>
            <Button.Root size='medium'>Ready to Start? → Sign Up Free</Button.Root>
            <Button.Root variant='neutral' mode='ghost' size='medium'>
              Still unsure? Watch our 2-minute demo
            </Button.Root>
          </div>
        </section>

        {/* Testimonials */}
        <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:gap-12 md:py-16'>
          <div className='max-w-3xl space-y-3'>
            <p className='text-subheading-sm uppercase tracking-[0.2em] text-text-sub-600'>
              Social proof
            </p>
            <h2 className='text-title-h3 text-text-strong-950'>
              Solopreneurs are already winning.
            </h2>
          </div>
          <div className='grid gap-4 md:grid-cols-2'>
            {testimonials.map((item) => (
              <div
                key={item.name}
                className='flex h-full flex-col gap-3 rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-custom-sm'
              >
                <div className='flex items-center gap-2 text-primary-base'>
                  <RiStarFill className='size-4' />
                  <RiStarFill className='size-4' />
                  <RiStarFill className='size-4' />
                  <RiStarFill className='size-4' />
                  <RiStarFill className='size-4' />
                </div>
                <p className='text-paragraph-md text-text-strong-950'>&ldquo;{item.quote}&rdquo;</p>
                <p className='text-label-sm text-text-sub-600'>
                  {item.name} — {item.role}
                </p>
                <p className='text-label-sm font-semibold text-primary-base'>{item.result}</p>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap gap-3 text-label-sm text-text-sub-600'>
            {[
              '3,000+ solopreneurs using Growtiva',
              '50,000+ AI-generated posts per month',
              '8.5 hours saved per week (average user)',
              '4.8/5 rating on G2 & Capterra',
              'Free trial — no credit card',
            ].map((item) => (
              <div
                key={item}
                className='flex items-center gap-2 rounded-full border border-stroke-soft-200 bg-bg-white-0 px-3 py-1 shadow-regular-xs'
              >
                <RiCheckLine className='size-4 text-primary-base' />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section
          id='pricing'
          className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:gap-12 md:py-16'
        >
          <div className='max-w-3xl space-y-3'>
            <p className='text-subheading-sm uppercase tracking-[0.2em] text-text-sub-600'>
              Pricing
            </p>
            <h2 className='text-title-h3 text-text-strong-950'>Simple, transparent pricing.</h2>
            <p className='text-paragraph-md text-text-sub-600'>
              No surprises. No hidden fees. Start free, upgrade when you&apos;re ready.
            </p>
          </div>
          <div className='grid gap-4 md:grid-cols-3'>
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'flex h-full flex-col gap-4 rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-custom-sm',
                  plan.highlight && 'border-primary-base shadow-custom-md',
                )}
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <h3 className='text-title-h6 text-text-strong-950'>{plan.name}</h3>
                    <p className='text-label-sm text-text-sub-600'>{plan.description}</p>
                  </div>
                  {plan.badge ? (
                    <Badge.Root variant='lighter' color='green' size='small'>
                      {plan.badge}
                    </Badge.Root>
                  ) : null}
                </div>
                <p className='text-title-h4 text-text-strong-950'>{plan.price}</p>
                <ul className='space-y-2 text-paragraph-sm text-text-strong-950'>
                  {plan.features.map((feat) => (
                    <li key={feat} className='flex items-start gap-2'>
                      <RiCheckLine className='mt-0.5 size-4 text-primary-base' />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button.Root size='medium' className='mt-auto'>
                  {plan.cta}
                </Button.Root>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap gap-3 text-label-sm text-text-sub-600'>
            {[
              'Cancel anytime (no questions asked)',
              '14-day free trial on Pro/Premium (no credit card)',
              '30-day money-back guarantee',
              'Join 3,000+ solopreneurs scaling with Growtiva',
            ].map((item) => (
              <div
                key={item}
                className='flex items-center gap-2 rounded-full border border-stroke-soft-200 bg-bg-white-0 px-3 py-1 shadow-regular-xs'
              >
                <RiCheckLine className='size-4 text-primary-base' />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:gap-12 md:py-16'>
          <div className='max-w-3xl space-y-3'>
            <p className='text-subheading-sm uppercase tracking-[0.2em] text-text-sub-600'>
              Questions? We&apos;ve got answers.
            </p>
            <h2 className='text-title-h3 text-text-strong-950'>Everything you need to know.</h2>
          </div>
          <div className='grid gap-4 md:grid-cols-2'>
            {faqs.map((item) => (
              <div
                key={item.q}
                className='rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'
              >
                <p className='text-label-md text-text-strong-950'>{item.q}</p>
                <p className='mt-2 text-paragraph-sm text-text-sub-600'>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className='mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-16 md:gap-8 md:pb-20'>
          <div className='rounded-3xl border border-stroke-soft-200 bg-gradient-to-r from-primary-base via-primary-darker to-green-600 p-8 shadow-custom-lg md:p-12'>
            <div className='flex flex-col gap-6 text-static-white md:flex-row md:items-center md:justify-between'>
              <div className='space-y-3'>
                <h3 className='text-title-h3'>Ready to scale without hiring?</h3>
                <p className='text-paragraph-md text-white/80'>
                  Join 3,000+ solopreneurs who already run Growtiva as their AI team. Start free—
                  no credit card required.
                </p>
                <div className='flex flex-wrap gap-2 text-label-sm text-white/80'>
                  <span>✓ 4.8/5 rating on G2 Capterra</span>
                  <span>✓ 50,000+ posts created this month</span>
                  <span>✓ 30-day money-back guarantee</span>
                </div>
              </div>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                <Button.Root size='medium' asChild>
                  <Link href='/signup'>Start Your Free Trial →</Link>
                </Button.Root>
                <Button.Root variant='neutral' mode='ghost' size='medium' asChild>
                  <Link href='#demo'>Watch 2-min demo</Link>
                </Button.Root>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className='border-t border-stroke-soft-200 bg-bg-weak-50'>
          <div className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12'>
            <div className='grid gap-8 md:grid-cols-4'>
              <div className='space-y-3'>
                <h4 className='text-label-md font-semibold text-text-strong-950'>Product</h4>
                <ul className='space-y-2 text-paragraph-sm text-text-sub-600'>
                  <li>Features</li>
                  <li>Pricing</li>
                  <li>Security</li>
                  <li>Roadmap</li>
                </ul>
              </div>
              <div className='space-y-3'>
                <h4 className='text-label-md font-semibold text-text-strong-950'>Company</h4>
                <ul className='space-y-2 text-paragraph-sm text-text-sub-600'>
                  <li>About Us</li>
                  <li>Blog</li>
                  <li>Press Kit</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div className='space-y-3'>
                <h4 className='text-label-md font-semibold text-text-strong-950'>Resources</h4>
                <ul className='space-y-2 text-paragraph-sm text-text-sub-600'>
                  <li>Help Center</li>
                  <li>API Docs</li>
                  <li>Integrations</li>
                  <li>Status Page</li>
                </ul>
              </div>
              <div className='space-y-3'>
                <h4 className='text-label-md font-semibold text-text-strong-950'>Legal</h4>
                <ul className='space-y-2 text-paragraph-sm text-text-sub-600'>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Security Policy</li>
                  <li>DPA</li>
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
                <span>Twitter</span>
                <span>LinkedIn</span>
                <span>Instagram</span>
                <span>TikTok</span>
                <span>YouTube</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
