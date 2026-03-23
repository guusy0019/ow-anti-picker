import { defineConfig } from '@julr/vite-plugin-validate-env';
import z from 'zod';

export default defineConfig({
  validator: 'standard',
  schema: {
    // Example Only: Rename or Set to required when ready
    VITE_API_BASE_URL: z.string().optional(),
    /** 未設定時は `/`（`vite.config` の既定と一致） */
    VITE_BASE_PATH: z.string().optional(),
  },
});
