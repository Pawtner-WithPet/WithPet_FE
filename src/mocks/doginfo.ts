
import { rest } from 'msw';

export const handlers = [
  rest.post('/api/pet/register', (req, res, ctx) => {
    const { name, age } = req.body as any;

    if (!name || !age) {
      return res(
        ctx.status(500),
        ctx.json({ message: 'name 또는 age 누락' })
      );
    }

    return res(
      ctx.status(201),
      ctx.json({
        message: '등록 성공',
        data: {
          id: '123',
          ...req.body,
        },
      })
    );
  }),
];
