"use client"
import Link from "next/link"
import { useAuthStore } from "@/stores/authStore"
import api from "@/utils/api"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { jwtDecode } from "jwt-decode"
import {z} from 'zod'
import { useRouter } from "next/navigation"
type Props = {}

const inputSchema = z.object({
  username: z.string().min(4, 'El usuario debe tener al menos 4 caracteres.').max(50, 'El usuario debe tener máximo 50 caracteres.'),
  password: z.string().min(4, 'La contraseña debe tener al menos 4 caracteres.')
})
type inputs = z.infer<typeof inputSchema>
function Formlogin({}: Props) {
  const {register, handleSubmit, formState: {errors}} = useForm<inputs>({
    resolver: zodResolver(inputSchema)
  })
  const router = useRouter()

  const setToken = useAuthStore(state => state.setToken)
  
  const onSubmit = async (data: inputs ) => {
    try {
    const res = await api.post('/auth/login', data)
    setToken(res.data.access_token)
    console.log(jwtDecode(res.data.access_token))
    router.push('/todos')
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Usuario</label>
          <input type="text" {...register('username')} />
          {errors.username && <p>{errors.username.message}</p>}
          <label htmlFor="password">Contraseña</label>
          <input type="password" {...register('password')}/>
          {errors.password && <p>{errors.password.message}</p>}
        
          <button className="" type="submit" >Login</button>
          <span>¿No tienes una cuenta?</span>
          <Link href={"register"}>Regístrate</Link>
        </form>
  )
}

export default Formlogin