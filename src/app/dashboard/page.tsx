'use client'

import { Button } from "@radix-ui/themes"
import { signOut } from "next-auth/react"

function DashboardPage() {
  return (
    <div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  )
}

export default DashboardPage