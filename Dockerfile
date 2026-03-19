# syntax = docker/dockerfile:1.6

ARG NODE_VERSION=22

# --- Base para construir ---
FROM node:${NODE_VERSION}-slim AS build
WORKDIR /app
# En la etapa de build queremos devDeps disponibles
ENV NODE_ENV=development

# Si tenés node-gyp/native deps, dejá estas líneas. Si no, podés quitarlas.
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

# Copiá lock y manifest primero para cachear la instalación
COPY package.json package-lock.json ./

# Cache de npm (requiere BuildKit: DOCKER_BUILDKIT=1)
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# Copiá el resto del proyecto y construí
COPY . .
# Si tu bundler toma NODE_ENV, setearlo a production sólo para el build:
ENV NODE_ENV=production
RUN npm run build

# --- Imagen final sólo estática ---
FROM nginx:alpine AS runner
# Copiamos el build de Vite a la raíz de Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Config Nginx (SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]