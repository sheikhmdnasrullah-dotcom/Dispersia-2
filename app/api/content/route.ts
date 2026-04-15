export const runtime = 'edge';

import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/content
 * Body: { tool: string, episodeId: string, instructions?: string, transcript?: string }
 *
 * Calls Claude to generate content for the given tool.
 * Only 'Show Notes' is wired; all others return a 501 stub.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { tool, episodeId, instructions, transcript } = body as {
      tool?: string
      episodeId?: string
      instructions?: string
      transcript?: string
    }

    if (!tool) {
      return NextResponse.json({ error: 'Missing tool field' }, { status: 400 })
    }

    // Only Show Notes is fully wired
    if (tool !== 'Show Notes') {
      return NextResponse.json(
        { error: `${tool} generation not yet wired to backend`, stub: true },
        { status: 501 }
      )
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 503 })
    }

    const systemPrompt = `You are an expert podcast show notes writer.
Write in the creator's voice: conversational, data-driven, actionable.
Format with markdown: H2 headings, bullet points, timestamps.
Keep it under 600 words.`

    const userPrompt = `Generate professional show notes for this podcast episode.
${instructions ? `Extra instructions: ${instructions}` : ''}
${transcript ? `Transcript excerpt:\n${transcript}` : 'Episode: EP 12 — The Compound Effect of Consistency with Marcus Chen.'}

Include: key takeaways, timestamps, memorable quotes, guest bio, call to action.`

    const claude = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!claude.ok) {
      const err = await claude.text()
      return NextResponse.json({ error: `Claude API error: ${err}` }, { status: 502 })
    }

    const data = await claude.json()
    const text = data?.content?.[0]?.text ?? ''
    return NextResponse.json({ ok: true, output: text, tool, episodeId })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
