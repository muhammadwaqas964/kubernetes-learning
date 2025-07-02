FROM oven/bun:1.1.13-alpine

WORKDIR /app

COPY ../.. ./

RUN bun install

WORKDIR /app/server

CMD ["bun", "run", "start"]

