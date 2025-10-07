import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const {} = req.body;

    const post = null;

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
