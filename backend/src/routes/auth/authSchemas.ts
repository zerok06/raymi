import { z } from 'zod'

export const signIn = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type signInType = z.infer<typeof signIn>

export const signUp = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string(),
})

export type signUpType = z.infer<typeof signUp>
