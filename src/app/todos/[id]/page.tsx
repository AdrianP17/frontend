// import { useEffect } from "react"
import UpdateFormTodo from "@/components/todos/UpdateFormTodo"
async function page({params} : {
    params: Promise<{id: string}>
}) {
    const id = (await params).id


    
    return (
      <div>
        <UpdateFormTodo id={id} />
      </div>
    )
    }


export default page