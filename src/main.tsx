import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import QueryProvider from './providers/query-client.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/food-api-web/">
      <QueryProvider>
        <TooltipProvider>
          <App />
        </TooltipProvider>
    </QueryProvider>
    </BrowserRouter>
  </StrictMode>,
)

