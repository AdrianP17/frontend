"use client"
import React, { useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import Todo from '@/components/todos/Todo'
import { tasksApi } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { Task } from '@/types/Task'
import { useAuthStore } from '@/stores/authStore'
import Link from 'next/link'
type Props = {}

function page({}: Props) {
  const [tasks, setTasks] = useState<Task[]>([])
  useEffect(() => {
    async function fetchTasks () {
      try {
        const res = await tasksApi.getAll()
      console.log(res.data)
      setTasks(res.data)
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchTasks()
  } , [])
  const router = useRouter()
  const logout = useAuthStore(state => state.logout)
  
  return (
    <section className='p-10'>
      <div className="flex flex-col sm:flex-row gap-6 mb-4">
      {tasks.map((task) => <Todo key={task.id} todo={task}></Todo>)}
      </div>
      <Link href='/todos/crear' className='px-4 py-2 rounded-md bg-gray-100 text-gray-500 inline-flex items-center gap-2 mb-10'>
      <IoIosAddCircleOutline stroke='4' size={20} />
      Crear to-do</Link>
      
      <button onClick={() => {
        logout()
        router.push('/login')
      }} className='flex bg-red-600 px-4 py-1 rounded-sm text-white'>Logout</button>
    </section>
  )
}

export default page