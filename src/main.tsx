import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import './index.css'
import { HeaderMegaMenu } from './components/HeaderMegaMenu/index.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ColorSchemeScript defaultColorScheme="auto" />
    <MantineProvider defaultColorScheme="auto">
      <QueryClientProvider client={queryClient}>
        <HeaderMegaMenu />
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
)
