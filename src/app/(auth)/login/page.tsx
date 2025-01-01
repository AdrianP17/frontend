import Link from "next/link"
import Formlogin from "@/components/auth/Formlogin"
type Props = {}


function page({}: Props) {
  
  return (
    <main className="w-full bg-blue-400 flex items-center justify-center">
      <div className="p-8 border rounded-lg">
        <h1 className="">Iniciar sesión</h1>
        <Formlogin/>
      </div>
    </main>
  )
}

export default page