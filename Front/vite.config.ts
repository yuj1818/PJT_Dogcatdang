import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
<<<<<<< HEAD
  console.log(env)
=======
  console.log(env);
>>>>>>> af81ff5fb808b1d8bbecfca8d60f152f55766db0

  return {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            kakaoMapApiKey: env.VITE_KAKAO_MAP_API_KEY,
          }
        }
      })
    ],
  }
}