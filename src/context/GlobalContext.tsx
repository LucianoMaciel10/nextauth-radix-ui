"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

function GlobalContext({ children }: Props) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        toastOptions={{
          style: {
            background: "rgb(9, 9, 11)",
            border: "2px solid rgb(84, 114, 228)",
            color: "white",
          },
        }}
      />
    </SessionProvider>
  );
}

export default GlobalContext;
