import { Outlet } from 'react-router'

import { Navbar } from '@components';

function App() {
  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>)
}

export default App
