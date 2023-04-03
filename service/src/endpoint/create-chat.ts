import type { ChatMessage } from '../chatgpt'
import { chatReplyProcess } from '../chatgpt'
import type { RequestProps } from '../types'

interface Response {
  data: {
    detail: {
      usage: {
        total_tokens: number
      }
    }
  }
}

export default async (req, res) => {
  res.setHeader('Content-type', 'application/octet-stream')

  try {
    const { prompt, options = {}, systemMessage } = req.body as RequestProps

    let firstChunk = true

    const response = await chatReplyProcess({
      message: prompt,
      lastContext: options,
      process: (chat: ChatMessage) => {
        res.write(firstChunk ? JSON.stringify(chat) : `\n${JSON.stringify(chat)}`)
        firstChunk = false
      },
      systemMessage,
    })

    const { data: { detail: { usage: { total_tokens } } } } = response as Response

    req.user.tokens_count = (req.user.tokens ?? 0) + total_tokens
    await req.user.save()
  }
  catch (error) {
    res.write(JSON.stringify(error))
  }
  finally {
    res.end()
  }
}
