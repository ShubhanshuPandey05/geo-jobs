FROM mcr.microsoft.com/playwright:v1.49.0-noble

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --production 2>/dev/null || npm install --production

# Install Playwright browsers
RUN npx playwright install chromium --with-deps

# Copy source code
COPY src/ ./src/

# Create logs and screenshots directories
RUN mkdir -p logs screenshots

# Run the scraper
CMD ["node", "src/index.js"]
