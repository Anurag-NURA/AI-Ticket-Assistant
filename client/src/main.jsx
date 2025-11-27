import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import './index.css'
import App from './App.jsx'
import { Auth } from '@components'
import { Home, Admin, Login, Signup, Ticket, Tickets, CreateTicket } from '@pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/admin",
        element: <Admin />
      },
      {
        path: "/tickets",
        element: <Tickets />
      },
      {
        path: "/tickets/create",
        element: <CreateTicket />
      },
      {
        path: "/tickets/:id",
        element: <Ticket />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
