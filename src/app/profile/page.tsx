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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Loader2 } from 'lucide-react'
import { sampleReports } from '@/lib/data'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number."),
  age: z.coerce.number().int().positive().min(1, "Age must be a positive number."),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  medicalRecords: z.any().optional(),
})

export default function ProfilePage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Alex Doe",
      address: "123 Health St, Wellness City",
      phone: "+11234567890",
      age: 34,
      bloodGroup: "O+",
    },
  })

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    setLoading(true);
    try {
      // We remove medicalRecords from the body as we aren't handling file uploads here.
      const { medicalRecords, ...profileData } = values;
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      toast({
        title: "Profile Updated!",
        description: "Your information has been saved successfully.",
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }
  
  const handleDownload = (reportName: string) => {
    toast({
      title: "Downloading Report",
      description: `${reportName} is being downloaded.`,
    });
    // In a real app, this would trigger a file download.
    console.log(`Downloading ${reportName}`);
  };


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section id="profile" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Manage Your Profile</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Keep your personal and medical information up to date for better care.
            </p>
            </div>
            <div className="mx-auto grid max-w-4xl gap-8 mt-8 items-start">
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
                            <FormControl><Input placeholder="John Doe" {...field} disabled={loading}/></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={form.control} name="age" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl><Input type="number" placeholder="30" {...field} disabled={loading}/></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl><Input placeholder="123 Health St, Wellness City" {...field} disabled={loading}/></FormControl>
                        <FormMessage />
                        </FormItem>
                    )} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl><Input placeholder="+1234567890" {...field} disabled={loading}/></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                        <FormField control={form.control} name="bloodGroup" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blood Group</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
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
                            <FormLabel>Upload New Medical Record (Optional)</FormLabel>
                            <FormControl><Input type="file" {...form.register("medicalRecords")} disabled={loading}/></FormControl>
                            <FormMessage />
                        </FormItem>
                        )} />
                    </CardContent>
                    <CardFooter>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Update Profile
                    </Button>
                    </CardFooter>
                </form>
                </Form>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                <CardTitle>Your Reports</CardTitle>
                <CardDescription>View and download your past medical reports.</CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {sampleReports.map((report) => (
                        <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.doctor}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleDownload(report.name)}>
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>

            </div>
        </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
