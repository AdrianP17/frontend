"use client"
import React, { useEffect, useState } from 'react'
import Todo from '@/components/todos/Todo'
import { tasksApi } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { Task } from '@/types/Task'
import { useAuthStore } from '@/stores/authStore'
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
    <div>
      {tasks.map((task) => <Todo key={task.id} todo={task}></Todo>)}
      <button onClick={() => {
        logout()
        router.push('/login')
      }} className=''>Logout</button>
    </div>
  )
}

export default page