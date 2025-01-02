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
    <form className="w-full sm:min-w-[400px] space-y-6" onSubmit={handleSubmit(onSubmit)}>

      <div className="flex flex-col gap-1">
          <label htmlFor="username">Usuario</label>
          <input className="p-2 border rounded-md" type="text" {...register('username')} />
          {errors.username && <p className="text-sm text-red-700">{errors.username.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
          <label htmlFor="password">Contraseña</label>
          <input className="p-2 border rounded-md" type="password" {...register('password')}/>
          {errors.password && <p className="text-sm text-red-700">{errors.password.message}</p>}
      </div>
        
          <button className="w-full px-4 py-2 bg-gray-800 text-white rounded-md" type="submit" >Login</button>
          <div className="mt-2 flex items-center justify-between">
          <span>¿No tienes una cuenta?</span>
          <Link className="text-sm underline" href={"register"}>Regístrate</Link>
          </div>
        </form>
  )
}

export default Formlogin