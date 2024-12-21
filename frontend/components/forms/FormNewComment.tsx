'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { Toaster } from '../ui/toaster'
import { useTransition } from 'react'
import { Textarea } from '../ui/textarea'
import { createComment } from '@/actions/commentActions'
import { useHomeContext } from '@/context/AuthContext'

const FormSchema = z.object({
  message: z.string().min(1, 'Title is required.'),
})

interface FormProps {
  eventId: number
}

export const FormNewComment: React.FC<FormProps> = ({ eventId }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: '',
    },
  })
  const { email, id: idUser } = useHomeContext()

  const [isPending, startTransition] = useTransition()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(() => {
      createComment({ ...data, eventId, userId: Number(idUser) }).then(res => {
        console.log(res)

        if (res.success) {
          toast({
            title: 'Event Created',
            description: res.msg,
          })
        }
      })
    })
  }

  return (
    <>
      {email}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your comment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <Button disabled={isPending} className="w-full" type="submit">
            Comentar
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  )
}
