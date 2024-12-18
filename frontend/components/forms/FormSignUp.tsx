'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {} from 'lucide-react'
import { toast } from '@/components/hooks/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '../ui/separator'
import { useTransition } from 'react'
import { signUp } from '@/actions/userActions'
import { Toaster } from '../ui/toaster'
import Link from 'next/link'

const FormSchema = z.object({
  firstName: z.string().min(3, {
    message: 'firstname must be at least 3 characters.',
  }),
  lastName: z.string().min(3, {
    message: 'lastName must be at least 3 characters.',
  }),
  username: z.string().min(3, {
    message: 'username must be at least 3 characters.',
  }),
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
})

export function FormSignUp() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    },
  })

  const [isPending, startTransition] = useTransition()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(() => {
      signUp(data).then(res => {
        console.log(res)

        if (res.success) {
          toast({
            title: 'Success',
            description: res.msg,
          })
        }
      })
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserName</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-sm text-white/50">
            Su correo electrónico se utilizará para enviarle actualizaciones de
            producto y de la comunidad
          </p>
          <Separator />
          <Button disabled={isPending} className="w-full" type="submit">
            Sign Up
          </Button>
          <Button asChild variant={'outline'} className="w-full">
            <Link href="/signin">Sign In</Link>
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  )
}
