import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(['true', 'false'])
      .optional()
      .transform(value => value === 'true'),
    PORT: z
      .string()
      .optional()
      .transform(value => parseInt(value, 10))
      .default('3000'),
  },
  shared: {
    API_URL: z.string().url().default('http://localhost:3000'),
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    PORT: process.env.PORT,
    API_URL: process.env.API_URL,
  },
});
