import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';

import InterviewProvider from './contexts/InterviewProvider.jsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0B0B0C',   // Main background
      paper: '#1A1A1D',     // Card or container background
    },
    primary: {
      main: '#A78BFA',      // Light purple (used for buttons, highlights)
    },
    text: {
      primary: '#FFFFFF',   // Main content text
      secondary: '#A78BFA', // Subtext, hints
    },
  },
  shape: {
    borderRadius: 12,
  },
});



const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>


    
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} 
    afterSignOutUrl="/" 
    navigate={(to) => window.history.pushState(null, '', to)}
     
      signInUrl="/sign-in"
      signUpUrl="/sign-up" >
    <BrowserRouter>
       
    <ThemeProvider theme={darkTheme}>
           <ToastContainer  position="bottom-right"/>
          <CssBaseline />
          <InterviewProvider> 
          <App />
          </InterviewProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ClerkProvider>




  </React.StrictMode>,
)




// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
