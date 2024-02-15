import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import { defineConfig, loadEnv } from "vite";
import million from "million/compiler";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config/

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env);

  return defineConfig({
    plugins: [
      [million.vite({ auto: true }), react()],
      ,
      compression({
        exclude: [/\.(br)$/, /\.(gz)$/],
        deleteOriginalAssets: true,
      }),
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
