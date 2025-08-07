FROM node:20-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile
# RUN npm i -g pnpm@7.33.2 && pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 5173

CMD ["pnpm", "start"]

