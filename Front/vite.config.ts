import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import { loadEnv, defineConfig } from "vite";
import million from "million/compiler";

// https://vitejs.dev/config/

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env);

  return defineConfig({
    plugins: [
      million.vite({ auto: true }),
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
  });
};
