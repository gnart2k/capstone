import * as gemini from "@google/generative-ai"
import { NextApiResponse } from "next"
import { NextResponse } from "next/server"
export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json()
  const genAI = new gemini.GoogleGenerativeAI(process.env.GOOGLE_API_KEY)

  const model = genAI.getGenerativeModel({ model: "gemini-pro" })

  const chat = model.startChat({
    history: body.history
  })
  const msg = await body.message
  const result = await chat.sendMessage(msg)
  const response = await result.response
  const text = response.text()
  return new Response(text)
}
