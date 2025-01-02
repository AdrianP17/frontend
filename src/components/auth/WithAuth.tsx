"use client"
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type WithAuthProps = {
  children?: React.ReactNode
}

const withAuth = <P extends object>(WrappedComponent : React.ComponentType<P>) => {

const ProtectedComponent: React.FC<P & WithAuthProps> = (props) => {
  const {checkAuth, isAuth} = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if(!checkAuth()){
      router.push('/login')
    }
  }, [checkAuth, router])
  
  if (!isAuth) {
    return <p>Cargando...</p>
  }

  return <WrappedComponent {...props} />
  }
  return ProtectedComponent
}

export default withAuth