import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Lexicon Dashboard</h1>
      <p>Please login to use the dashboard</p>
    </div>
  );
}
