
import {dirname, resolve} from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = dirname(__filename);
const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')


// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [react()],
  base: '/',
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      assetFileNames: ({name}) => {
        return 'assets/[name]-[hash][extname]';
      },
      input: {
        index: resolve(root,  'index.html'),
       
      }
    }
  }
})
