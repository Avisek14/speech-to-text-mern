import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const { user } = useAuth()
  const [showLogin, setShowLogin] = useState(true)

  if (!user) {
    return showLogin
      ? <Login onSwitch={() => setShowLogin(false)} />
      : <Register onSwitch={() => setShowLogin(true)} />
  }

  return <Home />
}

export default App