import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./theme-toggle"
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"

export default async function NavigationBar() {
    return (
        <nav className="flex items-center h-14 px-4 border-b">
            <Link className="font-semibold mr-4" href='/'>
                Hand Writing
            </Link>
            <div className="flex-1" />
            <ModeToggle />
            <AuthButton />
        </nav>
    )
}

export async function AuthButton() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const signOut = async () => {
        "use server";
        const supabase = createClient();
        await supabase.auth.signOut();
        return redirect("/login");
    };
    return user ? (
        <div className="flex items-center gap-4">
          Hey, {user.email}!
          <form action={signOut}>
            <Button>
              Logout
            </Button>
          </form>
        </div>
      ) : (
        <Link
          href="/login"
          className="py-2 px-3 flex rounded-md no-underline"
        >
          Login
        </Link>
      );
    }