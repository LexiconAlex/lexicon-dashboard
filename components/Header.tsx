"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useFormStatus } from "react-dom";
import { addPost } from "@/app/actions/addPost";
import { DialogClose } from "@radix-ui/react-dialog";

export default function Header() {
  const { data: session, status } = useSession();
  const { pending } = useFormStatus();
  return (
    <header className="bg-primary text-primary-foreground sticky top-0 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Dashboard
        </Link>
        {status === "authenticated" ? (
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage
                src={session?.user?.image || undefined}
                alt={session?.user?.name || undefined}
              />
            </Avatar>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"secondary"}>Add Post</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Post</DialogTitle>
                  <DialogDescription>Lets make a new post</DialogDescription>
                </DialogHeader>
                <form action={addPost}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="Enter your title"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Body
                      </Label>
                      <Input
                        id="body"
                        name="body"
                        placeholder="Enter content"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button disabled={pending} type="submit">
                        {pending ? "Saving..." : "Add post"}
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button
              variant={"secondary"}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Signout
            </Button>
          </div>
        ) : (
          <Button variant={"secondary"} onClick={() => signIn("github")}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
