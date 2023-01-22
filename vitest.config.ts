import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
   include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
   exclude:["**/node_modules/**, **/dist/**, **/cypress/**"],
   watchExclude:[" **/node_modules/**, **/dist/**, **/build/**"],
  },
})
