export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'elite'

export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  subscription_tier: SubscriptionTier
  stripe_customer_id: string | null
  created_at: string
}

export interface Course {
  id: string
  title: string
  description: string | null
  price_cents: number | null
  tier_required: SubscriptionTier
  thumbnail_url: string | null
  published: boolean
  created_at: string
}

export interface Lesson {
  id: string
  course_id: string
  title: string
  video_url: string | null
  duration_seconds: number | null
  order_index: number
  content_markdown: string | null
}

export interface UserProgress {
  user_id: string
  lesson_id: string
  completed: boolean
  completed_at: string | null
}

export interface AIConversation {
  id: string
  user_id: string
  agent_type: AgentType
  messages: ChatMessage[]
  created_at: string
}

export type AgentType =
  | 'mix_advisor'
  | 'beat_analyzer'
  | 'vocal_producer'
  | 'industry_mentor'
  | 'curriculum_guide'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface SoundKit {
  id: string
  title: string
  description: string | null
  price_cents: number
  download_url: string
  preview_url: string | null
  thumbnail_url: string | null
}
