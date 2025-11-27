import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router';

import App from '../App.jsx';

export const Auth = () => {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      if (location.pathname !== '/login' && location.pathname !== '/signup') {
        navigate('/login');
      }
    } else {
      if (location.pathname === '/login' || location.pathname === '/signup') {
        navigate('/');
      }
    }
  }, [navigate, location])

  return (
    <div>
      <App />
    </div>
  )
}