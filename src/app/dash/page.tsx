import { auth } from "@/server/auth"
import { redirect } from "next/navigation"

export default async function DashPage() {
  const session = await auth()
    if (!session) {
        redirect("/login")
    }

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to your dashboard, {session.user?.name}! Username: {session.user?.handle}</h1>
    </div>
  )
}