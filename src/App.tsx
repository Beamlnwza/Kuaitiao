import './style/index.css'
import Foods from './pages/foods'
import Order from './pages/order'
import Login from './pages/auth'
import Console from './pages/console'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Foods />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>404</div>} />
        <Route path="/404" element={<div>404</div>} />
        <Route path="/admin" element={<Console />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
