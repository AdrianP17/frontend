import CrearFormTodo from "@/components/todos/CrearFormTodo"
function page() {
  return (
    <main className="w-full bg-orange-50/40 flex items-center p-4">
      <div className="p-8 border max-w-screen-sm w-full mx-auto rounded-lg items-center flex flex-col">
        <CrearFormTodo />
      </div>
    </main>
  )
}

export default page