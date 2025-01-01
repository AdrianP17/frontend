"use client"
import Link from "next/link"
import api from "@/utils/api"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useRouter } from "next/navigation"

const inputSchema = z.object({
    username: z.string().min(4, 'El usuario debe tener al menos 4 caracteres.').max(50, 'El usuario debe tener máximo 50 caracteres.'),
    name: z.string(),
    lastname: z.string(),
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Usuario</label>
            <input type="text" {...register('username')} />
            {errors.username && <p>{errors.username.message}</p>}

            <label htmlFor="name">Nombre</label>
            <input type="text" {...register('name')} />
            {errors.name && <p>{errors.name.message}</p>}

            <label htmlFor="lastname">Apellido</label>
            <input type="text" {...register('lastname')} />
            {errors.lastname && <p>{errors.lastname.message}</p>}

            <label htmlFor="password">Contraseña</label>
            <input type="password" {...register('password')} />
            {errors.password && <p>{errors.password.message}</p>}

            <label htmlFor="password">Repita la contraseña</label>
            <input type="password" {...register('repeatPassword')} />
            {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
            <span>¿Ya tienes una cuenta?</span>
            <Link href="/login">Inicia sesión</Link>
            <button className="" type="submit" >Register</button>
        </form>
    )
}

export default RegisterForm