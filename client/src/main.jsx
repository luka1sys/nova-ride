
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CarsProvider } from './contexts/CarsContext.jsx'
import { BookingProvider } from './contexts/BookingContext.jsx'
import { ReviewProvider } from './contexts/ReviewContext.jsx'
import "./i18n";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CarsProvider>
        <BookingProvider>
          <ReviewProvider>
            <App />
          </ReviewProvider>
        </BookingProvider>
      </CarsProvider>
    </AuthProvider>
  </BrowserRouter>
)
