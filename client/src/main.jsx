import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PostHogProvider } from '@posthog/react'
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
})
const options = {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  defaults: '2026-01-30',
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_POSTHOG_TOKEN} options={options}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </PostHogProvider>
  </StrictMode>,
)
