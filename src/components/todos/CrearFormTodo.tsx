"use client"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { useAuthStore } from "@/stores/authStore"
import api, { tasksApi } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import {z} from 'zod'
// import { useRouter } from "next/navigation"

const TaskDto = z.object({
    title: z.string().min(3, {message: 'Mínimo 3 caracteres'}).max(40, {message: 'El título no debe tener más de 40 caracteres'}),
    description: z.string().min(3, {message: 'Mínimo 3 caracteres'}).max(80, {message: 'No debes escribir más de 80 caracteres'}),
    tags: z.array(z.string().min(1, { message: 'Etiqueta vacía no permitida' })).min(1).max(5)
})
type InputTaskType = z.infer<typeof TaskDto>

export default function CrearFormTodo() {
    const id = useAuthStore(state => state.user.sub)
    const {register , handleSubmit, formState: {errors}, control} = useForm<InputTaskType>({
        defaultValues: {
            tags: ['']
        },
        resolver: zodResolver(TaskDto)
    })
    const {fields, append, remove} = useFieldArray({
        control,
        name:'tags'
    })
    const router = useRouter()

    async function onSubmit (data : InputTaskType) {
        try {
            const {description, tags, title} = data
            
            const createdTask = await tasksApi.create(title, description, id, tags)
            console.log(createdTask)

            router.push('/todos')
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Título</label>
        <input {...register('title')} />
        {errors.title && <p>{errors.title.message}</p>}

        <label htmlFor="">Descripción</label>
        <input {...register('description')} />
        {errors.description && <p>{errors.description.message}</p>}

        <label htmlFor="">Etiquetas</label>
        {fields.map((field, index) => (
            <div key={field.id}>
                <Controller control={control} name={`tags.${index}`} render={({field}) => <input {...field} />} />
                {errors.tags && <p></p>}
                <button className="" type="button" onClick={() => {remove(index)}}>Eliminar</button>
            </div>
        ))}
        <button type="button" onClick={() => append('')}>Añadir etiqueta</button>
        {errors.tags && <p>{errors.tags.message}</p>}
    
        <button type="submit" className="w-full px-5 py-2 bg-black text-white rounded-md">Enviar</button>
    </form>
  )
}