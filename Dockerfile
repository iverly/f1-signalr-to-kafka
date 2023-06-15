# =================================
# Step 1: Build the base image
# =================================
FROM node:16-bullseye AS base

ARG USERNAME=node
ARG USER_UID=1001
ARG USER_GID=$USER_UID

RUN npm i -g pnpm

# =================================
# Step 2: Install dependencies
# =================================
FROM base AS dependencies
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# =================================
# Step 3: Create the final image
# =================================
FROM base AS final
WORKDIR /etc/exporter
USER $USERNAME

ENV NODE_ENV=production
ENV DEBUG=exporter:*
ENV EXPORTER_LOG_LEVEL=info
ENV KAFKAJS_NO_PARTITIONER_WARNING=1

COPY --chown=$USERNAME:$USERNAME ./src ./src
COPY --chown=$USERNAME:$USERNAME --from=dependencies /app/node_modules ./node_modules

CMD ["node", "src/index.js"]
