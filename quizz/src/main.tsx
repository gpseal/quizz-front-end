import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './context/authProvider.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import ErrorPage from './components/errors/router-error-page.tsx'
// import Home from './components/Home.tsx'
// import Register from './components/Register.tsx'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "home",
//     element: <Home />
//   },
//   {
//     path: "register",
//     element: <Register />
//   }
// ])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
