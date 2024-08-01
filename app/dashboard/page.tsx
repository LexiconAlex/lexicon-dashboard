import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import UserTable from "@/components/UserTable";

const prisma = new PrismaClient();

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div>
      <h1 className="2xl font-bold mb-4">Lexicon Dashboard</h1>
      <UserTable users={users} isAdmin={isAdmin} />
    </div>
  );
}
