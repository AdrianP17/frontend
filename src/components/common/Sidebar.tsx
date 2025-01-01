import Link from "next/link";

function Sidebar() {
  return (
    <div className="w-24 flex flex-col gap-5">
        <Link href="/perfil">Perfil</Link>
        <Link href="/todos">To-dos</Link>
        <button onClick={() => {}}>Cerrar sesión</button>
    </div>
  )
}

export default Sidebar