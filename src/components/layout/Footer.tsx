import Link from 'next/link'
import { Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F97316] to-[#D4AF37] flex items-center justify-center">
                <span className="text-[#1A1A1A] font-bold text-lg">IU</span>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gradient-gold">
                  Internz University Pro
                </h2>
              </div>
            </div>
            <p className="text-[#737373] text-sm max-w-md mb-6">
              AI-powered music education from Grammy-nominated producer Kosine.
              Learn production, mixing, and industry secrets from someone who's
              worked with Nicki Minaj, Rihanna, and Big Sean.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/kosine"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center text-[#737373] hover:text-[#D4AF37] hover:bg-[#333] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/kosine"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center text-[#737373] hover:text-[#D4AF37] hover:bg-[#333] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@kosine"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#252525] flex items-center justify-center text-[#737373] hover:text-[#D4AF37] hover:bg-[#333] transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-[#FFFEF2] uppercase tracking-wider mb-4">
              Learn
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/courses" className="text-[#737373] hover:text-[#D4AF37] text-sm">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/sound-kits" className="text-[#737373] hover:text-[#D4AF37] text-sm">
                  Sound Kits
                </Link>
              </li>
              <li>
                <Link href="/ai-mentor" className="text-[#737373] hover:text-[#D4AF37] text-sm">
                  AI Mentor
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-[#737373] hover:text-[#D4AF37] text-sm">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-[#FFFEF2] uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-[#737373] hover:text-[#D4AF37] text-sm">
                  About Kosine
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#737373] hover:text-[#D4AF37] text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#737373] hover:text-[#D4AF37] text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#737373] hover:text-[#D4AF37] text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#333] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#525252] text-sm">
            &copy; {new Date().getFullYear()} Gourmet Ratchet / Da Internz. All rights reserved.
          </p>
          <p className="text-[#525252] text-xs">
            Powered by NEXUS Command Center
          </p>
        </div>
      </div>
    </footer>
  )
}
