import LoginButton from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import {Poppins} from "next/font/google"



const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default async function Home() {
  return (
    <main className="flex h-screen flex-col justify-center items-center bg-gradient-to-r from-blue-700  via-blue-500 via-50% to-blue-600  ">

      <div className=" space-y-6 text-center">
        <h1 className={cn("text-4xl font-semibold text-white drop-shadow-[0_3px_10px_rgb(0,0,0,0.2)]", font.className) }>
          🔐Auth
        </h1>
        <p className="text-lg text-white font-medium">
          An authentication application
        </p>

        <div>
          <LoginButton>
            <Button variant={"secondary"} size={"lg"} className="text-lg h-12 rounded-xl">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>

    </main>
  );
}
