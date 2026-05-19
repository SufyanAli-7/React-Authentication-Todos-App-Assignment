import { useAuth } from '@/context/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ Component }) => {
    const{ isAuth } = useAuth()
    if (!isAuth) return <Navigate to='/auth/login' replace />  
  return (
    <Component />
  )
}

export default ProtectedRoute