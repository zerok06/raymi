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
import { useState, useTransition } from 'react'
import { createEvent } from '@/actions/eventActions'
import { TimePicker } from '../ui/datetime-picker'
import { MultiSelect } from '../ui/multi-select'
import { Cat, Dog, Fish, Rabbit, Turtle } from 'lucide-react'
import { Tag, TagInput } from 'emblor'

const FormSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  images: z.string().url('Please provide a valid URL for the images.'),
  description: z.string().min(1, 'Description is required.'),
  fecha: z
    .string()
    .refine(
      value => !isNaN(Date.parse(value)),
      'Please provide a valid date (YYYY-MM-DD).'
    ),
  ubicacion: z.string().min(1, 'Location is required.'),
  organizacionId: z.number().optional(), // Puede ser opcional
})

export function FormNewEvent() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      images: '',
      description: '',
      fecha: '',
      ubicacion: '',
      organizacionId: undefined,
    },
  })

  const [isPending, startTransition] = useTransition()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(() => {
      createEvent(data).then(res => {
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
  /*  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    'react',
    'angular',
  ])
  const [tags, setTags] = useState<Tag[]>([])
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)

  const frameworksList = [
    { value: 'react', label: 'React', icon: Turtle },
    { value: 'angular', label: 'Angular', icon: Cat },
    { value: 'vue', label: 'Vue', icon: Dog },
    { value: 'svelte', label: 'Svelte', icon: Rabbit },
    { value: 'ember', label: 'Ember', icon: Fish },
  ] */

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fecha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="Enter event date"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fecha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <TimePicker date={new Date()} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* 
          <FormField
            control={form.control}
            name="fecha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={frameworksList}
                    onValueChange={setSelectedFrameworks}
                    defaultValue={selectedFrameworks}
                    placeholder="Select frameworks"
                    variant="inverted"
                    maxCount={3}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fecha"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <TagInput
                    {...field}
                    placeholder="Enter a topic"
                    tags={tags}
                    className="sm:min-w-[450px]"
                    setTags={newTags => {
                      setTags(newTags)
                      setValue('topics', newTags as [Tag, ...Tag[]])
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
 */}
          <FormField
            control={form.control}
            name="ubicacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="organizacionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter organization ID (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <Button disabled={isPending} className="w-full" type="submit">
            Create Event
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  )
}
