"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { findSpecialistAction } from "@/app/actions"
import type { SmartDoctorFinderOutput } from '@/ai/flows/smart-doctor-finder'
import { Loader2, Sparkles, UserCheck, Search } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  symptomsDescription: z.string().min(20, {
    message: "Please describe your symptoms in at least 20 characters.",
  }),
})

// This would typically come from a database.
const availableDoctors = ["Cardiologist", "Dermatologist", "General Physician", "Neurologist", "Orthopedic Surgeon"];

const SmartDoctorFinder = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SmartDoctorFinderOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptomsDescription: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);

    const input = { ...values, availableDoctors };
    const response = await findSpecialistAction(input);

    setLoading(false);

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: response.error,
      });
    }
  }
  
  return (
    <section id="find-specialist" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-block rounded-lg bg-accent/20 px-3 py-1 text-sm text-accent-foreground">AI-Powered Search</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Find the Right Specialist, Instantly</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't know which doctor to consult? Describe your symptoms, and our smart assistant will recommend the best specialist for you.
            </p>
        </div>

        <div className="mx-auto max-w-3xl mt-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Sparkles className="text-accent"/> Your Symptoms</CardTitle>
                    <CardDescription>
                        Please provide a detailed description of your symptoms, including duration and severity.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="symptomsDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder="e.g., I've had a persistent cough and shortness of breath for the last two weeks..."
                                                className="resize-none"
                                                rows={6}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 h-4 w-4" />
                                        Find Specialist
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>

            {result && (
                <Alert className="mt-8 bg-card shadow-md">
                    <UserCheck className="h-4 w-4" />
                    <AlertTitle className="font-bold">Recommendation</AlertTitle>
                    <AlertDescription className="mt-2 space-y-2">
                        <p><strong>Suggested Specialist:</strong> {result.suggestedSpecialist}</p>
                        <p><strong>Reasoning:</strong> {result.reasoning}</p>
                    </AlertDescription>
                </Alert>
            )}
        </div>
      </div>
    </section>
  )
}

export default SmartDoctorFinder;
