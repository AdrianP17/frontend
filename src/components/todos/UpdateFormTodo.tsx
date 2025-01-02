'use client'
import { useAuthStore } from "@/stores/authStore"
import { tasksApi } from "@/utils/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { TaskDto, InputTaskType } from "./CrearFormTodo"
import { useEffect, useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { MdAdd } from "react-icons/md"
type Props = {
    id: string
}

export default function UpdateFormTodo({id}: Props) {
    const userId = useAuthStore(state => state.user.sub)

    const {register , handleSubmit, formState: {errors}, control, reset} = useForm<InputTaskType>({
        defaultValues: {
            title: '',
            description: '',
            tags: ['']
        },
        resolver: zodResolver(TaskDto)
    })
    useEffect(()=> {
        async function fetchTask() {
            try {
                const res = await tasksApi.getById(id)
                // Actualiza los valores del formulario con los datos obtenidos
                const { title, description, tags } = res.data
                reset({
                    title: title || '',
                    description: description || '',
                    tags: tags || ['']
                })
            } catch (error) {
                console.error('Error fetching task:', error);
            } 
    
        }
        fetchTask()
    }, [])
    

   
    const {fields, append, remove} = useFieldArray({
        control,
        name:'tags'
    })
    const router = useRouter()

    async function onSubmit (data : InputTaskType) {
        try {
            
            const createdTask = await tasksApi.update(id, data)
            console.log(createdTask)

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
    
        <button type="submit" className="w-full px-5 py-2 bg-black text-white rounded-md">Actualizar</button>
    </form>
  )
}