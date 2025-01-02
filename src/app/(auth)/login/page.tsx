import Link from "next/link"
import Formlogin from "@/components/auth/Formlogin"
type Props = {}


function page({}: Props) {
  
  return (
    <main className="w-full bg-orange-50/40 flex items-center p-4">
      <div className="p-8 border max-w-screen-sm w-full mx-auto rounded-lg items-center flex flex-col">
        <h1 className="text-4xl mb-10">Iniciar sesión</h1>
        <Formlogin/>
      </div>
    </main>
  )
}

export default page