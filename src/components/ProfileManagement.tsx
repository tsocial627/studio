"use client"

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number."),
  age: z.coerce.number().int().positive().min(1, "Age must be a positive number."),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  medicalRecords: z.any().optional(),
})

const ProfileManagement = () => {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      address: "",
      phone: "",
      age: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values)
    toast({
      title: "Profile Updated!",
      description: "Your information has been saved successfully.",
    })
  }

  return (
    <section id="profile" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Manage Your Profile</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Keep your personal and medical information up to date for better care.
          </p>
        </div>
        <div className="mx-auto max-w-2xl mt-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>
                This information is confidential and will only be shared with your doctor.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="age" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl><Input type="number" placeholder="30" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl><Input placeholder="123 Health St, Wellness City" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl><Input placeholder="+1234567890" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="bloodGroup" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Group</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select blood group" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                              <SelectItem key={group} value={group}>{group}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="medicalRecords" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Medical Records (Optional)</FormLabel>
                        <FormControl><Input type="file" {...form.register("medicalRecords")} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">Save Profile</Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default ProfileManagement
