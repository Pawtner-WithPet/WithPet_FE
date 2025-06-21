import {rest} from 'msw';

export const handlers = [
  rest.get('https://your-api.com/api/dogs', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {id: '1', name: '멍멍이', age: 2, breed: '푸들', image: 'https://...'},
        {
          id: '2',
          name: '냥냥이',
          age: 3,
          breed: '말티즈',
          image: 'https://...',
        },
      ]),
    );
  }),
];
