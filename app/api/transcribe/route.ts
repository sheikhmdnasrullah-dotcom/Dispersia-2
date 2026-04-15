import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/transcribe
 * Body: { url: string }
 *
 * Accepts a YouTube URL and queues a transcription job.
 * Returns a job ID that the client can poll for status.
 *
 * TODO: integrate with Whisper/Deepgram/AssemblyAI backend.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { url } = body as { url?: string }

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid url field' }, { status: 400 })
    }

    // Basic YouTube URL validation
    const isYouTube = /^https?:\/\/(www\.)?(youtube\.com\/watch|youtu\.be\/)/.test(url.trim())
    if (!isYouTube) {
      return NextResponse.json({ error: 'URL does not appear to be a valid YouTube link' }, { status: 422 })
    }

    // ── Placeholder response ──
    // In production this would:
    // 1. Download audio via yt-dlp
    // 2. Send to Whisper/AssemblyAI
    // 3. Store transcript + diarization in DB
    // 4. Return a job_id to poll
    const jobId = `job_${Date.now()}`

    return NextResponse.json({
      ok: true,
      job_id: jobId,
      status: 'queued',
      message: 'Transcription queued. Poll /api/transcribe/status?job_id=' + jobId,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
