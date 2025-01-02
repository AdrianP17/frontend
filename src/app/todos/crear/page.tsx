'use client'
import CrearFormTodo from "@/components/todos/CrearFormTodo"
import { redirect } from "next/navigation"
import { useAuthStore } from "@/stores/authStore"
function page() {
  const {isAuth} = useAuthStore()
  if (!isAuth) {
    redirect('/login')
  }
  return (
    <main className="w-full bg-orange-50/40 flex items-center p-4">
      <div className="mx-auto max-w-screen-sm">
      <h1 className="text-3xl font-medium mb-4 text-center">Crear tarea</h1>
        <CrearFormTodo />
      </div>
    </main>
  )
}

export default page