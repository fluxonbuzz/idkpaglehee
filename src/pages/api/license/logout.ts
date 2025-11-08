import type { NextApiRequest, NextApiResponse } from 'next'

const SESSION_COOKIE = 'license_session'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const isProd = process.env.NODE_ENV === 'production'
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${isProd ? 'Secure' : ''}`)
  return res.status(200).json({ success: true })
}
