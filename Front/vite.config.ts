import { loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    base: '/',
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            kakaoMapApiKey: env.VITE_KAKAO_MAP_API_KEY,
          },
        },
      }),
    ],
  };
};
