import { updateUserRole } from "@/app/actions/updateUserRole";
import { Role } from "@prisma/client";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: Role;
};

interface UserTableProps {
  users: User[];
  isAdmin: boolean;
}

export default function UserTable({ users, isAdmin }: UserTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Role</th>
          {isAdmin && <th className="border p-2">Action</th>}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="border p-2">{user.name}</td>
            <td className="border p-2">{user.email}</td>
            <td className="border p-2">{user.role}</td>
            {isAdmin && (
              <td className="border p-2">
                <form action={updateUserRole}>
                  <input type="hidden" name="userId" value={user.id} />
                  <select
                    name="newRole"
                    defaultValue={user.role}
                    className="border p-1 mr-2"
                  >
                    <option value={Role.ADMIN}>Admin</option>
                    <option value={Role.USER}>User</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-2 py-1"
                  >
                    Change
                  </button>
                </form>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
