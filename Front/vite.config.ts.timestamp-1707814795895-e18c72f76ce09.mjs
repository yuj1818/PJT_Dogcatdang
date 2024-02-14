// vite.config.ts
import react from "file:///C:/Users/SSAFY/Desktop/S10P12E202/Front/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { createHtmlPlugin } from "file:///C:/Users/SSAFY/Desktop/S10P12E202/Front/node_modules/vite-plugin-html/dist/index.mjs";
import { defineConfig, loadEnv } from "file:///C:/Users/SSAFY/Desktop/S10P12E202/Front/node_modules/vite/dist/node/index.js";
import million from "file:///C:/Users/SSAFY/Desktop/S10P12E202/Front/node_modules/million/dist/packages/compiler.mjs";
var vite_config_default = ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env);
  return defineConfig({
    plugins: [
      [million.vite({ auto: true }), react()],
      ,
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            kakaoMapApiKey: env.VITE_KAKAO_MAP_API_KEY
          }
        }
      })
    ]
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxTU0FGWVxcXFxEZXNrdG9wXFxcXFMxMFAxMkUyMDJcXFxcRnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFNTQUZZXFxcXERlc2t0b3BcXFxcUzEwUDEyRTIwMlxcXFxGcm9udFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvU1NBRlkvRGVza3RvcC9TMTBQMTJFMjAyL0Zyb250L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLWh0bWxcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IG1pbGxpb24gZnJvbSBcIm1pbGxpb24vY29tcGlsZXJcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcblxyXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH0pID0+IHtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpO1xyXG4gIGNvbnNvbGUubG9nKGVudik7XHJcblxyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICBbbWlsbGlvbi52aXRlKHsgYXV0bzogdHJ1ZSB9KSwgcmVhY3QoKV0sXHJcbiAgICAgICxcclxuICAgICAgY3JlYXRlSHRtbFBsdWdpbih7XHJcbiAgICAgICAgbWluaWZ5OiB0cnVlLFxyXG4gICAgICAgIGluamVjdDoge1xyXG4gICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBrYWthb01hcEFwaUtleTogZW52LlZJVEVfS0FLQU9fTUFQX0FQSV9LRVksXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgXSxcclxuICB9KTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVCxPQUFPLFdBQVc7QUFDclUsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxhQUFhO0FBSXBCLElBQU8sc0JBQVEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUMzQixRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3ZDLFVBQVEsSUFBSSxHQUFHO0FBRWYsU0FBTyxhQUFhO0FBQUEsSUFDbEIsU0FBUztBQUFBLE1BQ1AsQ0FBQyxRQUFRLEtBQUssRUFBRSxNQUFNLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUFBLE1BQ3RDO0FBQUEsTUFDQSxpQkFBaUI7QUFBQSxRQUNmLFFBQVE7QUFBQSxRQUNSLFFBQVE7QUFBQSxVQUNOLE1BQU07QUFBQSxZQUNKLGdCQUFnQixJQUFJO0FBQUEsVUFDdEI7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
