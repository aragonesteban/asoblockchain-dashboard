import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { auth } from '../../config/init-firebase'

export const RequireAuth = ({ children }) => {
  const currentAuth = auth.getAuth()
  const navigate = useNavigate();
  
  useEffect(() => {
    auth.onAuthStateChanged(currentAuth, (user) => {
      if (!user) {
        navigate('/login')
      }
    })
  }, [navigate])

  return children
}
