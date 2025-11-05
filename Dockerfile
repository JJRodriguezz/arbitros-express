FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### Paso 9: Crear `.dockerignore`
```
node_modules
npm-debug.log
.env
.git
.gitignore
README.md