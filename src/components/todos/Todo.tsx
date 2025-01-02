import { Task } from "@/types/Task"
import { TbFlag3Filled } from "react-icons/tb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { tasksApi } from "@/utils/api"
import { ChangeEvent, ChangeEventHandler, useState } from "react"
type Props = {
  todo: Task
}

export default function Todo({ todo }: Props) {
  
  const [priority, setPriority] = useState<string>(todo.priority)
  const [status, setStatus] = useState<string>(todo.status)

  const priorityClass = priority === 'alta' ? 'bg-red-100' : priority === 'media' ? 'bg-orange-100' : 'bg-gray-100'
  const statusColor = status === 'pendiente' ? 'bg-orange-100' : 'bg-green-100'

  const classBtn = status === 'pendiente' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-black'
  function changePriority(value: string) {
    const newPriority = value as 'alta' | 'media' | 'baja'; 
    setPriority(newPriority);
    tasksApi.update(String(todo.id), { priority: newPriority });
  }

  function changeStatus(status: string) {
    const newStatus = status as 'completada' | 'pendiente'; 
    setStatus(newStatus);
    tasksApi.update(String(todo.id), { status: newStatus });
  }

  return (
    <div className="p-4 rounded-lg flex flex-col border max-w-[280px]">
      <div className="">
        <p className="text-2xl font-medium mb-2">{todo.title}</p>
        <div className="flex gap-3 items-center mb-2">
        <p className={`${priorityClass} w-fit flex gap-1 items-center px-2 rounded-full text-sm`}>
        <TbFlag3Filled />
          {priority}</p>
        <p className={`${statusColor} text-sm px-1 rounded-sm`}>{status}</p>
        </div>
        <p className="text-gray-400 mb-6">{todo.description}</p>
        <div className="flex gap-2 items-center mb-5">
        <p className="">Prioridad</p>
        <Select value={priority} onValueChange={changePriority}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder={priority} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="baja">
              <div className="p-1 rounded-sm bg-gray-100">Baja</div>
            </SelectItem>
            <SelectItem value="media">
            <div className="p-1 rounded-sm bg-orange-100">Media</div>
            </SelectItem>
            <SelectItem value="alta">
            <div className="p-1 rounded-sm bg-red-100">Alta</div>
            </SelectItem>
          </SelectContent>
        </Select>
        </div>
        <button onClick={() => {
          status === 'pendiente' ? 
            changeStatus('completada')
           : changeStatus('pendiente')
         }} className={`${classBtn} px-5 py-3 rounded-lg w-full`} >{status === "pendiente" ? "Completar" : "Completado"}</button>
      </div>
    </div>
  )
}

