"use client"
import Link from "next/link"
import api from "@/utils/api"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useRouter } from "next/navigation"

const inputSchema = z.object({
    username: z.string().min(4, 'El usuario debe tener al menos 4 caracteres.').max(50, 'El usuario debe tener máximo 50 caracteres.'),
    name: z.string().nonempty({message: 'Debe tener al menos un caracter'}),
    lastname: z.string().nonempty({message: 'Debe tener al menos un caracter'}),
    password: z.string().min(4, 'La contraseña debe tener al menos 4 caracteres.'),
    repeatPassword: z.string()
}).refine(data => data.password === data.repeatPassword, { message: 'Las contraseñas no coinciden', path: ['repeatPassword'] });
type inputs = z.infer<typeof inputSchema>

function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<inputs>({
        resolver: zodResolver(inputSchema)
    })
    const router = useRouter()

    const onSubmit = async (data: inputs) => {
        try {
            console.log(data)
            const { repeatPassword, ...rest } = data
            console.log(rest)
            const res = await api.post('/auth/register', rest)
            router.push('/login')
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
      <label htmlFor="name">Nombre</label>
            <input className="p-2 border rounded-md" type="text" {...register('name')} />
            {errors.name && <p className="text-sm text-red-700">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
        <label htmlFor="lastname">Apellido</label>
            <input className="p-2 border rounded-md" type="text" {...register('lastname')} />
            {errors.lastname && <p className="text-sm text-red-700">{errors.lastname.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
        <label htmlFor="password">Contraseña</label>
            <input className="p-2 border rounded-md" type="password" {...register('password')} />
            {errors.password && <p className="text-sm text-red-700">{errors.password.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
        <label htmlFor="password">Repita la contraseña</label>
            <input className="p-2 border rounded-md" type="password" {...register('repeatPassword')} />
            {errors.repeatPassword && <p className="text-sm text-red-700">{errors.repeatPassword.message}</p>}
        </div>
            <button className="w-full px-4 py-2 bg-gray-800 text-white rounded-md" type="submit" >Register</button>
            <div className="mt-2 flex items-center justify-between">
          <span>¿Ya tienes una cuenta?</span>
          <Link className="text-sm underline" href='/login'>Inicia sesión</Link>
          </div>
        </form>
    )
}

export default RegisterForm