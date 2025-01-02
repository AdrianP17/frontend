
import UpdateFormTodo from "@/components/todos/UpdateFormTodo"
import withAuth from "@/components/auth/WithAuth"
async function page({params} : {
    params: Promise<{id: string}>
}) {
    const id = (await params).id


    
    return (
      <main className="w-full bg-orange-50/40 flex items-center p-4">
        <div className="p-8 border max-w-screen-sm w-full mx-auto rounded-lg items-center flex flex-col">
        <h1 className="text-3xl font-medium mb-4">Editar tarea</h1>
        <UpdateFormTodo id={id} />
        </div>
      </main>
    )
    }


export default page