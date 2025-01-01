import RegisterForm from "@/components/auth/RegisterForm"
function page() {
  return (
    <main className="w-full bg-blue-400 flex items-center justify-center">
    <div className="p-8 border rounded-lg">
      <h1 className="">Registro</h1>
      <RegisterForm/>
    </div>
  </main>
  )
}

export default page