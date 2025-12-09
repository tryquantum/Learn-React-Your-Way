export interface PainPoint {
  title: string;
  description: string;
  icon: string;
}

export interface ValueProp {
  title: string;
  description: string;
  icon: string;
  cta: string;
  stat?: string;
}

export interface Step {
  title: string;
  copy: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  result: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  badge?: string;
  highlight?: boolean;
}

export interface FAQ {
  q: string;
  a: string;
}

export const painPoints: PainPoint[] = [
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

export const valueProps: ValueProp[] = [
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

export const steps: Step[] = [
  { title: 'Sign Up (1 min)', copy: 'Email + password. Done. No credit card required.' },
  { title: 'Pick Your Industry (1 min)', copy: 'We tailor templates for coaches, ecommerce, freelancers, real estate, and more.' },
  { title: 'Create Your First Post (3 min)', copy: 'Answer 3 questions. Your AI team writes professional copy. Aha moment unlocked.' },
  { title: 'Connect Your Socials (1 min)', copy: 'One-click connections to start scheduling immediately.' },
  { title: 'Activate Automation (1 min)', copy: 'Set it and forget it. Your AI team creates and posts while you sleep.' },
];

export const testimonials: Testimonial[] = [
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

export const pricing: PricingPlan[] = [
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

export const faqs: FAQ[] = [
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
    a: "30-day money-back guarantee. If you're not seeing value, we refund you. Simple. ",
  },
];

export const socialProofStats = [
  '3,000+ solopreneurs using Growtiva',
  '50,000+ AI-generated posts per month',
  '8.5 hours saved per week (average user)',
  '4.8/5 rating on G2 & Capterra',
  'Free trial — no credit card',
];

export const pricingCTAStats = [
  'Cancel anytime (no questions asked)',
  '14-day free trial on Pro/Premium (no credit card)',
  '30-day money-back guarantee',
  'Join 3,000+ solopreneurs scaling with Growtiva',
];
