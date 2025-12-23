import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer/index';
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './contexts/theme-context'




const store = configureStore({
  reducer: rootReducer
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        {/* <React.StrictMode> */}
        <App />
        <Toaster />
        {/* </React.StrictMode> */}
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
)





