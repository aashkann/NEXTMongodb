'use client'
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Icons } from "@/components/icons"
import { Control, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  date: z.string().refine((value) => !isNaN(Date.parse(value))), // Validate date format
  hint: z.string().min(2, {
    message: "Hint must be at least 2 characters.",
  }),
})

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { name, date, hint } = data
    const formattedDate = new Date(date).toISOString() // Convert date string to ISO format

    // Send the data to your API endpoint
    fetch("http://localhost:3000/api/cakes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, date: formattedDate, hint }),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success response
          toast({ title: "Cake created successfully" })
        } else {
          // Handle error response
          toast({ title: "Failed to create cake", description: "error" })
        }
      })
      .catch((error) => {
        // Handle error
        toast({ title: "An error occurred", description: "error" })
      })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:w-2/3 flex flex-col space-y-6 md:space-y-0 md:space-x-6 md:flex-row"
      >
        <div className="md:flex md:flex-1 flex-col space-y-6">
          <FormLabel>Name:</FormLabel>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormControl>
                <Input placeholder="who" {...field} />
              </FormControl>
            )}
          />
          <FormDescription>how do we know you by</FormDescription>
        </div>

        <div className="md:flex md:flex-1 flex-col space-y-6">
          <FormLabel>Date:</FormLabel>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={`w-[240px] pl-3 text-left font-normal ${
                        !field.value && "text-muted-foreground"
                      }`}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>when</span>
                      )}
                      <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date?.toISOString())}
                    disabled={(date) =>
                      date > new Date("2024-01-01") || date < new Date("2023-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          <FormDescription>when do we get the cake?</FormDescription>
        </div>

        <div className="md:flex md:flex-1 flex-col space-y-6">
          <FormLabel>Hint:</FormLabel>
          <FormField
            control={form.control}
            name="hint"
            render={({ field }) => (
              <FormControl>
                <Input placeholder="what" {...field} />
              </FormControl>
            )}
          />
          <FormDescription>Is it something great?</FormDescription>
        </div>

        <div className="mt-6 md:mt-0 md:self-start">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
