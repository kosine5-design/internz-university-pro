'use client'

import Link from 'next/link'
import { Menu, X, User, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps {
  user?: {
    email: string
    full_name: string | null
    avatar_url: string | null
  } | null
}

export default function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#333]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F97316] to-[#D4AF37] flex items-center justify-center">
              <span className="text-[#1A1A1A] font-bold text-lg">IU</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gradient-gold">
                Internz University
              </h1>
              <p className="text-xs text-[#737373] -mt-1">Pro</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/courses"
              className="text-[#A3A3A3] hover:text-[#FFFEF2] transition-colors text-sm font-medium"
            >
              Courses
            </Link>
            <Link
              href="/sound-kits"
              className="text-[#A3A3A3] hover:text-[#FFFEF2] transition-colors text-sm font-medium"
            >
              Sound Kits
            </Link>
            <Link
              href="/ai-mentor"
              className="text-[#A3A3A3] hover:text-[#FFFEF2] transition-colors text-sm font-medium"
            >
              AI Mentor
            </Link>
            <Link
              href="/community"
              className="text-[#A3A3A3] hover:text-[#FFFEF2] transition-colors text-sm font-medium"
            >
              Community
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-[#FFFEF2] hover:text-[#D4AF37] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center overflow-hidden">
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-[#737373]" />
                    )}
                  </div>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#252525] border border-[#333] rounded-lg shadow-xl py-1">
                    <div className="px-4 py-2 border-b border-[#333]">
                      <p className="text-sm text-[#FFFEF2] font-medium truncate">
                        {user.full_name || user.email}
                      </p>
                      <p className="text-xs text-[#737373] truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#A3A3A3] hover:text-[#FFFEF2] hover:bg-[#333]"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#A3A3A3] hover:text-[#FFFEF2] hover:bg-[#333]"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#EF4444] hover:bg-[#333] w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-[#A3A3A3] hover:text-[#FFFEF2] transition-colors text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary text-sm">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#A3A3A3] hover:text-[#FFFEF2]"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#333]">
            <nav className="flex flex-col gap-2">
              <Link
                href="/courses"
                className="px-4 py-2 text-[#A3A3A3] hover:text-[#FFFEF2] hover:bg-[#252525] rounded-lg"
              >
                Courses
              </Link>
              <Link
                href="/sound-kits"
                className="px-4 py-2 text-[#A3A3A3] hover:text-[#FFFEF2] hover:bg-[#252525] rounded-lg"
              >
                Sound Kits
              </Link>
              <Link
                href="/ai-mentor"
                className="px-4 py-2 text-[#A3A3A3] hover:text-[#FFFEF2] hover:bg-[#252525] rounded-lg"
              >
                AI Mentor
              </Link>
              <Link
                href="/community"
                className="px-4 py-2 text-[#A3A3A3] hover:text-[#FFFEF2] hover:bg-[#252525] rounded-lg"
              >
                Community
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
