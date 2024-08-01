import { updateUserRole } from "@/app/actions/updateUserRole";
import { Role } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <Table>
      <TableCaption>Userlist</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="text-right">
              <form action={updateUserRole}>
                <Select name="newRole">
                  <SelectTrigger>
                    <SelectValue placeholder={user.role} />
                    <SelectContent>
                      <SelectItem value={Role.ADMIN}>{Role.ADMIN}</SelectItem>
                      <SelectItem value={Role.USER}>{Role.USER}</SelectItem>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
                <input type="hidden" name="userId" value={user.id} />
                <Button type="submit">Change role</Button>
              </form>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
