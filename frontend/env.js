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
  client: {},
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    PORT: process.env.PORT,
  },
});
