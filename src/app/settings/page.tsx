import { auth } from "@/server/auth/";
import { redirect } from "next/navigation"
import { SettingsForm } from "./settings-form"

export default async function SettingsPage() {
    const session = await auth()
    if (!session) {
        redirect("/login")
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Settings for {session.user?.name}</h1>
            <SettingsForm user={session.user} />
        </div>
    )
}