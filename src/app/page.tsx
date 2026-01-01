import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  Music,
  Sparkles,
  Users,
  Award,
  Play,
  MessageSquare,
  Download,
  ChevronRight,
  CheckCircle,
  Sliders,
  Drum,
  Mic,
  Briefcase,
} from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'AI Mentors',
    description:
      'Get personalized feedback from AI agents trained on 16+ years of hit-making experience.',
  },
  {
    icon: Play,
    title: 'HD Video Courses',
    description:
      'Learn at your own pace with professional courses on production, mixing, and industry navigation.',
  },
  {
    icon: Download,
    title: 'Exclusive Sound Kits',
    description:
      'Download the same drums, 808s, and samples used on platinum records.',
  },
  {
    icon: Users,
    title: 'Community Access',
    description:
      'Connect with other producers, share your work, and get feedback from peers.',
  },
]

const aiAgents = [
  {
    name: 'Mix Advisor',
    role: 'Get professional feedback on your mixes',
    icon: Sliders,
  },
  {
    name: 'Beat Analyzer',
    role: 'Analyze your beats for arrangement and hit potential',
    icon: Drum,
  },
  {
    name: 'Vocal Producer',
    role: 'Perfect your vocal production and arrangements',
    icon: Mic,
  },
  {
    name: 'Industry Mentor',
    role: 'Navigate the music business with insider knowledge',
    icon: Briefcase,
  },
]

const credits = [
  'Nicki Minaj',
  'Rihanna',
  'Big Sean',
  'Ledisi',
  'Fox Empire',
  'Fox Star',
  'BET ManCave',
  'The Encore',
]

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Start learning the basics',
    features: [
      '1 free course',
      '5 AI questions/month',
      'Community access',
      'Free sound kit samples',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Basic',
    price: '$49',
    period: '/month',
    description: 'Unlock full course library',
    features: [
      'All courses included',
      '50 AI interactions/month',
      'All sound kits',
      'Forum participation',
      'Progress tracking',
    ],
    cta: 'Subscribe',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$149',
    period: '/month',
    description: 'Unlimited AI mentorship',
    features: [
      'Everything in Basic',
      'Unlimited AI access',
      'Mix feedback reports',
      'Personalized learning path',
      'Priority support',
    ],
    cta: 'Go Pro',
    highlighted: true,
  },
  {
    name: 'Elite',
    price: '$499',
    period: '/month',
    description: 'Direct access to Kosine',
    features: [
      'Everything in Pro',
      'Monthly 1-on-1 with Kosine',
      'Beat placement opportunities',
      'Industry introductions',
      'Exclusive masterclasses',
    ],
    cta: 'Apply',
    highlighted: false,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1A1A1A] to-[#1A1A1A]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#F97316]/10 blur-[120px] rounded-full" />

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F97316]/20 to-[#D4AF37]/20 border border-[#F97316]/30 mb-8">
            <Sparkles className="w-4 h-4 text-[#F97316]" />
            <span className="text-sm text-[#D4AF37] font-medium">
              AI-Powered Music Education
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-display">
            <span className="text-[#FFFEF2]">Learn from a</span>
            <br />
            <span className="text-gradient-gold">Grammy-Nominated</span>
            <br />
            <span className="text-[#FFFEF2]">Producer</span>
          </h1>

          <p className="text-xl text-[#A3A3A3] max-w-2xl mx-auto mb-10">
            Internz University Pro gives you access to courses, sound kits, and
            AI mentors trained on 16+ years of hit-making experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/register" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
              Start Learning Free
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link href="/courses" className="btn-secondary text-lg px-8 py-4">
              Browse Courses
            </Link>
          </div>

          {/* Credits */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-[#525252]">
            <span className="text-[#737373]">Credits include:</span>
            {credits.map((credit) => (
              <span key={credit} className="text-[#A3A3A3]">
                {credit}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFFEF2] mb-4 font-display">
              Everything You Need to Level Up
            </h2>
            <p className="text-[#A3A3A3] max-w-xl mx-auto">
              From beat-making fundamentals to industry secrets, get the complete
              toolkit for becoming a professional producer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F97316] to-[#D4AF37] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-[#1A1A1A]" />
                </div>
                <h3 className="text-lg font-semibold text-[#FFFEF2] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#737373]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#1A1A1A] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#252525] border border-[#333] mb-4">
              <span className="text-xs text-[#10B981] uppercase tracking-wider font-semibold">
                Powered by NEXUS
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFFEF2] mb-4 font-display">
              AI Mentors at Your Service
            </h2>
            <p className="text-[#A3A3A3] max-w-xl mx-auto">
              Get personalized feedback 24/7 from AI agents trained on professional
              production techniques and industry knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiAgents.map((agent) => (
              <div
                key={agent.name}
                className="bg-[#1f1f1f] border border-[#333] rounded-xl p-6 hover:border-[#F97316] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F97316] to-[#D4AF37] flex items-center justify-center mb-4">
                  <agent.icon className="w-6 h-6 text-[#1A1A1A]" />
                </div>
                <h3 className="text-lg font-semibold text-[#FFFEF2] mb-1">
                  {agent.name}
                </h3>
                <p className="text-sm text-[#737373]">{agent.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFFEF2] mb-4 font-display">
              Choose Your Path
            </h2>
            <p className="text-[#A3A3A3] max-w-xl mx-auto">
              Start free and upgrade as you grow. Every tier includes lifetime
              access to your purchased content.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 ${
                  tier.highlighted
                    ? 'bg-gradient-to-b from-[#F97316]/20 to-[#1A1A1A] border-2 border-[#F97316] relative'
                    : 'bg-[#1f1f1f] border border-[#333]'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#F97316] text-[#1A1A1A] text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-lg font-semibold text-[#FFFEF2] mb-1">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-[#D4AF37]">
                    {tier.price}
                  </span>
                  <span className="text-sm text-[#525252]">{tier.period}</span>
                </div>
                <p className="text-sm text-[#737373] mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-[#A3A3A3]">
                      <CheckCircle className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-[#F97316] to-[#D4AF37] text-[#1A1A1A] hover:opacity-90'
                      : 'border border-[#333] text-[#FFFEF2] hover:border-[#F97316] hover:text-[#F97316]'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#F97316]/20 to-[#D4AF37]/20 rounded-3xl p-12 border border-[#F97316]/30">
            <Award className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFFEF2] mb-4 font-display">
              Ready to Make Hits?
            </h2>
            <p className="text-lg text-[#A3A3A3] mb-8 max-w-xl mx-auto">
              Join thousands of producers learning from real industry experience.
              Start your journey today.
            </p>
            <Link href="/register" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2">
              Start Learning Free
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
