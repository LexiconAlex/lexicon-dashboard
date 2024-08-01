"use server";

import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function addPost(formData: FormData) {
    const session = await auth();
    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    if (!title || !body) {
        throw new Error("Invalid data");
    }

    try {
        await prisma.post.create({
            data: {
                title,
                body,
            },
        });
        revalidatePath("/");
    } catch (error) {
        console.error("Failed to add post:", error);
        throw new Error("Failed to add post.");
    }
}