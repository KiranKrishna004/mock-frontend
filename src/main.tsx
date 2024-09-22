import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css'
import {
  createTheme,
  localStorageColorSchemeManager,
  MantineProvider,
} from '@mantine/core'
import './index.css'
import { HeaderMegaMenu } from './components/HeaderMegaMenu/index.tsx'

const theme = createTheme({
  /** Put your mantine theme override here */
})

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'my-app-color-scheme',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} colorSchemeManager={colorSchemeManager}>
      <HeaderMegaMenu />
      <App />
    </MantineProvider>
  </StrictMode>
)
