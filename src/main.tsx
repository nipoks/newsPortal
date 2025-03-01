import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/App'
import {ThemeProvider} from '@gravity-ui/uikit';
import { TooltipProvider } from "./components/minimal-tiptap/ui/tooltip"
import './global.css'
import '@gravity-ui/uikit/styles/styles.css';
import {ToasterComponent, ToasterProvider} from '@gravity-ui/uikit';

import './styles.css';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={'dark'}>
          <TooltipProvider delayDuration={0} >
              <ToasterProvider>
                  <App />
                  <ToasterComponent className="optional additional classes" />
              </ToasterProvider>
          </TooltipProvider>
      </ThemeProvider>
  </StrictMode>,
)
