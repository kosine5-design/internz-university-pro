import { NextRequest, NextResponse } from 'next/server'
import { getAgentResponse, getAgentName } from '@/lib/ai/agents'
import { AgentType, ChatMessage } from '@/types/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { agentType, message, conversationHistory } = body as {
      agentType: AgentType
      message: string
      conversationHistory: ChatMessage[]
    }

    if (!agentType || !message) {
      return NextResponse.json(
        { error: 'Missing agentType or message' },
        { status: 400 }
      )
    }

    // Validate agent type
    const validAgents: AgentType[] = [
      'mix_advisor',
      'beat_analyzer',
      'vocal_producer',
      'industry_mentor',
      'curriculum_guide',
    ]

    if (!validAgents.includes(agentType)) {
      return NextResponse.json(
        { error: 'Invalid agent type' },
        { status: 400 }
      )
    }

    // Get response from AI agent
    const response = await getAgentResponse(
      agentType,
      message,
      conversationHistory || []
    )

    return NextResponse.json({
      success: true,
      agentName: getAgentName(agentType),
      message: response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('AI Chat Error:', error)
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    )
  }
}
