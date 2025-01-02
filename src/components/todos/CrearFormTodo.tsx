"use client"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { useAuthStore } from "@/stores/authStore"
import { RxCross2 } from "react-icons/rx";
import { MdAdd } from "react-icons/md";
import api, { tasksApi } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import {z} from 'zod'
// import { useRouter } from "next/navigation"

export const TaskDto = z.object({
    title: z.string().min(3, {message: 'Mínimo 3 caracteres'}).max(40, {message: 'El título no debe tener más de 40 caracteres'}),
    description: z.string().min(3, {message: 'Mínimo 3 caracteres'}).max(80, {message: 'No debes escribir más de 80 caracteres'}),
    tags: z.array(z.string().min(1, { message: 'Etiqueta vacía no permitida' })).min(1).max(5)
})
export type InputTaskType = z.infer<typeof TaskDto>

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

            router.push('/todos')
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <form className="w-full sm:min-w-[400px] space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
        <label htmlFor="">Título</label>
        <input className="p-2 border rounded-md" {...register('title')} />
        {errors.title && <p className="text-sm text-red-700">{errors.title.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
        <label htmlFor="">Descripción</label>
        <input className="p-2 border rounded-md" {...register('description')} />
        {errors.description && <p className="text-sm text-red-700">{errors.description.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
        <label htmlFor="">Etiquetas</label>
        <div className="flex gap-3 flex-wrap">
        {fields.map((field, index) => (
            <div className="relative" key={field.id}>
                <Controller control={control} name={`tags.${index}`} render={({field}) => <input className="p-1 bg-gray-50 border text-sm rounded-md" {...field} />} />
                {errors.tags && <p></p>}
                <button className="absolute right-1 top-[5px]" type="button" onClick={() => {remove(index)}}><RxCross2 size={20} /></button>
            </div>
        ))}
        </div>
        </div>
        <button type="button" className="flex items-center text-gray-600 gap-2 " onClick={() => append('')}><MdAdd />Añadir etiqueta</button>
        {errors.tags && <p>{errors.tags.message}</p>}
    
        <button type="submit" className="w-full px-5 py-2 bg-black text-white rounded-md">Enviar</button>
    </form>
  )
}