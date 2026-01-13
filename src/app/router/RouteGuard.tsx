import { Navigate, Outlet } from "react-router"
import { useAppSelector } from "../store/reduxTypes"


export const RouteGuard = () => {
  const isAuth = useAppSelector(state => state.auth.user)
  if (!isAuth) {
    return <Navigate to="/" replace />
  }
  return <Outlet />
}