# 사용할 Node.js 버전 지정
FROM nginx:1.25.3-alpine

# 작업 디렉토리 설정
WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

VOLUME [ "/etc/letsencrypt:/etc/letsencrypt" ]

# 소스 코드를 작업 디렉토리로 복사
COPY dist/ .

# 환경 변수 설정 (필요에 따라 변경 가능)
# ENV REACT_APP_API_URL=https://api.example.com

EXPOSE 80

# 앱 실행 (production 환경)
CMD ["nginx", "-g", "daemon off;"]
