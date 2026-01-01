'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Download,
  MessageSquare,
  Users,
  LayoutDashboard,
  Settings,
  Award,
  TrendingUp,
  Music,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Courses', href: '/dashboard/courses', icon: BookOpen },
  { name: 'AI Mentor', href: '/dashboard/ai-mentor', icon: MessageSquare },
  { name: 'Sound Kits', href: '/dashboard/sound-kits', icon: Download },
  { name: 'Community', href: '/dashboard/community', icon: Users },
  { name: 'My Progress', href: '/dashboard/progress', icon: TrendingUp },
  { name: 'Certificates', href: '/dashboard/certificates', icon: Award },
]

const agentNav = [
  { name: 'Mix Advisor', href: '/dashboard/ai-mentor/mix', icon: Music },
  { name: 'Beat Analyzer', href: '/dashboard/ai-mentor/beat', icon: Music },
  { name: 'Vocal Producer', href: '/dashboard/ai-mentor/vocal', icon: Music },
  { name: 'Industry Mentor', href: '/dashboard/ai-mentor/industry', icon: Users },
]

interface SidebarProps {
  subscriptionTier?: 'free' | 'basic' | 'pro' | 'elite'
}

export default function Sidebar({ subscriptionTier = 'free' }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-[#0a0a0a] border-r border-[#333] overflow-y-auto">
      <div className="p-4">
        {/* Subscription Badge */}
        <div className="mb-6 p-3 rounded-lg bg-gradient-to-r from-[#F97316]/10 to-[#D4AF37]/10 border border-[#333]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#737373] uppercase tracking-wider">Plan</span>
            <span
              className={cn(
                'text-xs font-semibold px-2 py-0.5 rounded',
                subscriptionTier === 'elite' && 'bg-[#D4AF37] text-[#1A1A1A]',
                subscriptionTier === 'pro' && 'bg-[#F97316] text-[#1A1A1A]',
                subscriptionTier === 'basic' && 'bg-[#10B981] text-[#1A1A1A]',
                subscriptionTier === 'free' && 'bg-[#333] text-[#737373]'
              )}
            >
              {subscriptionTier.toUpperCase()}
            </span>
          </div>
          {subscriptionTier === 'free' && (
            <Link
              href="/pricing"
              className="mt-2 block text-center text-xs text-[#F97316] hover:text-[#D4AF37] transition-colors"
            >
              Upgrade for AI access
            </Link>
          )}
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-gradient-to-r from-[#F97316]/20 to-transparent text-[#F97316] border-l-2 border-[#F97316]'
                    : 'text-[#A3A3A3] hover:text-[#FFFEF2] hover:bg-[#252525]'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* AI Agents Section */}
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-[#525252] uppercase tracking-wider mb-3">
            AI Agents
          </h3>
          <nav className="space-y-1">
            {agentNav.map((item) => {
              const isActive = pathname === item.href
              const isLocked = subscriptionTier === 'free'
              return (
                <Link
                  key={item.name}
                  href={isLocked ? '/pricing' : item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                    isLocked && 'opacity-50',
                    isActive
                      ? 'bg-[#252525] text-[#D4AF37]'
                      : 'text-[#737373] hover:text-[#FFFEF2] hover:bg-[#252525]'
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                  {isLocked && (
                    <span className="ml-auto text-[10px] text-[#525252]">PRO</span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Settings */}
        <div className="mt-8 pt-4 border-t border-[#333]">
          <Link
            href="/dashboard/settings"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === '/dashboard/settings'
                ? 'text-[#F97316]'
                : 'text-[#A3A3A3] hover:text-[#FFFEF2] hover:bg-[#252525]'
            )}
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </div>
      </div>
    </aside>
  )
}
