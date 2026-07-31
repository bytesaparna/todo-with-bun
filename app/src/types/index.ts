import { z } from "zod";

export const taskSchema = z.object({
    id: z.string(),
    title: z.string(),
    userId: z.string()
})
export type TASK = z.infer<typeof taskSchema>;

export const userSchema = z.object({
    id: z.string(),
    email: z.string(),
    password: z.string()
})

export type USER = z.infer<typeof userSchema>;