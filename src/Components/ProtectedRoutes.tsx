import { useRecoilValue } from 'recoil'
import { loginState } from '../auth/Store/Atom'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes() {
const auth =useRecoilValue(loginState)

if(!auth?.loggedIn){
  return <Navigate to="/" replace />
}

return <Outlet />
}
export default ProtectedRoutes
