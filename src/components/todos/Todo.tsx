import { Task } from "@/types/Task"

type Props = {
    todo: Task
}

export default function Todo({todo}: Props) {
  const statusColor = todo.status === 'pendiente' ? 'bg-orange-100' : 'bg-green-100'
  const priority = todo.priority === 'alta' ? 'bg-red-100' : todo.priority === 'media' ? 'bg-orange-100' : 'bg-gray-100'



  return (
    <div className="p-4 rounded-lg flex flex-col ">
        <div className="">
            <p className="">{todo.title}</p>
            <p className="">{todo.description}</p>
            <p className={`${priority}`}>{todo.priority}</p>
            <p className="">{todo.status}</p>
            <button onClick={() => {}} className="">Completar</button>
        </div>
    </div>
  )
}

