// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface IResponse {
  code: number;
  msg: string;
  data: {
    templateSMS: string
  }
}

export default function sendVerifyCode(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const { to = '', templateId = '1' } = req.body
  console.log(`to:${to}-templateId: ${templateId}`)
  // res.status(200).json({ name: 'John Doe' })
  res.status(200).json({
    code: 0,
    msg: '',
    data: {
      templateSMS: '1233' //ToDO 随机数据
    }
  });
}
