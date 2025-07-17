"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { StarRating } from "./StarRating";
import { doctors } from "@/lib/data";

const feedbackSchema = z.object({
  doctor: z.string().min(1, "Please select a doctor."),
  rating: z.number().min(1, "Rating is required.").max(5),
  diagnosisFeedback: z.string().min(10, "Please provide at least 10 characters for diagnosis feedback."),
  communicationFeedback: z.string().min(10, "Please provide at least 10 characters for communication feedback."),
});

type SubmittedFeedback = z.infer<typeof feedbackSchema>;

const ConsultationFeedback = () => {
  const { toast } = useToast();
  const [submittedReviews, setSubmittedReviews] = useState<SubmittedFeedback[]>([]);

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      doctor: "",
      rating: 0,
      diagnosisFeedback: "",
      communicationFeedback: "",
    },
  });

  function onSubmit(values: z.infer<typeof feedbackSchema>) {
    setSubmittedReviews((prev) => [...prev, values]);
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for sharing your experience.",
    });
    form.reset();
  }

  return (
    <section id="feedback" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Consultation Feedback</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Help us improve our services by providing your valuable feedback.
          </p>
        </div>

        <div className="mx-auto max-w-2xl mt-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Share Your Experience</CardTitle>
              <CardDescription>Your feedback is anonymous and helps other patients.</CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="doctor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the doctor you consulted" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {doctors.map((doc) => (
                              <SelectItem key={doc.id} value={doc.name}>
                                {doc.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Overall Rating</FormLabel>
                        <FormControl>
                           <Controller
                            name="rating"
                            control={form.control}
                            render={({ field }) => <StarRating rating={field.value} onRate={field.onChange} size={24} />}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="diagnosisFeedback"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diagnosis Effectiveness</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How effective was the diagnosis?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="communicationFeedback"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Communication</FormLabel>
                        <FormControl>
                          <Textarea placeholder="How was the doctor's communication?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">Submit Review</Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </div>

        {submittedReviews.length > 0 && (
          <div className="mx-auto max-w-2xl mt-12">
            <h3 className="text-2xl font-bold text-center mb-6">Submitted Reviews</h3>
            <div className="space-y-4">
              {submittedReviews.map((review, index) => (
                <Card key={index} className="shadow-md">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{review.doctor}</span>
                      <StarRating rating={review.rating} size={20} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Diagnosis:</strong> {review.diagnosisFeedback}</p>
                    <p><strong>Communication:</strong> {review.communicationFeedback}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ConsultationFeedback;
