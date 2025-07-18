"use client";

import { useState, useEffect } from "react";
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
import { Loader2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const feedbackSchema = z.object({
  doctor: z.string().min(1, "Please select a doctor."),
  rating: z.number().min(1, "Rating is required.").max(5),
  comment: z.string().min(10, "Please provide at least 10 characters."),
});

type SubmittedFeedback = {
  id: string;
  doctorName: string;
  rating: number;
  comment: string;
  timestamp: string;
}

const ConsultationFeedback = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<SubmittedFeedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      doctor: "",
      rating: 0,
      comment: "",
    },
  });

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const response = await fetch('/api/feedback');
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      setReviews(data.feedback);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        variant: "destructive",
        title: "Error",
        description: `Could not fetch reviews: ${errorMessage}`,
      });
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  async function onSubmit(values: z.infer<typeof feedbackSchema>) {
    setLoading(true);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          doctorName: values.doctor,
          rating: values.rating,
          comment: values.comment,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for sharing your experience.",
      });
      form.reset();
      fetchReviews(); // Refresh reviews after submission
    } catch(error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
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

        <div className="mx-auto grid max-w-4xl gap-12 mt-8 lg:grid-cols-2 lg:gap-8 items-start">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Share Your Experience</CardTitle>
              <CardDescription>Your feedback helps other patients.</CardDescription>
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
                        <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
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
                            render={({ field }) => <StarRating rating={field.value} onRate={field.onChange} size={24} disabled={loading}/>}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Feedback</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Share details of your own experience at this place" {...field} disabled={loading} rows={4}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Review
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>

          <div className="space-y-6">
             <h3 className="text-2xl font-bold text-center lg:text-left">Recent Reviews</h3>
             {reviewsLoading ? (
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <Card key={i} className="shadow-md p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-24" />
                      </div>
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                    </Card>
                  ))}
                </div>
             ) : reviews.length > 0 ? (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {reviews.map((review) => (
                    <Card key={review.id} className="shadow-md">
                      <CardHeader>
                        <CardTitle className="flex justify-between items-center text-lg">
                          <span>{review.doctorName}</span>
                          <StarRating rating={review.rating} size={20} />
                        </CardTitle>
                         <CardDescription>{new Date(review.timestamp).toLocaleDateString()}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No reviews yet. Be the first to leave one!</p>
             )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConsultationFeedback;
