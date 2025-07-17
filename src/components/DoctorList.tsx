
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Search, MessageSquare, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { doctors } from "@/lib/data"
import { StarRating } from "./StarRating"


const FeedbackForm = ({ doctorName, onSubmitSuccess }: { doctorName: string; onSubmitSuccess: () => void }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        variant: "destructive",
        title: "Rating required",
        description: "Please select a rating before submitting.",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctorName, rating, comment }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      
      toast({
        title: "Feedback Submitted!",
        description: `Thank you for your review of ${doctorName}.`,
      });
      onSubmitSuccess();
    } catch (error) {
       const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <p className="font-medium">Your rating for {doctorName}</p>
        <StarRating rating={rating} onRate={setRating} size={24} />
      </div>
      <div className="space-y-2">
        <label htmlFor="comment" className="font-medium">Your feedback</label>
        <Textarea
          id="comment"
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          disabled={loading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit Feedback
      </Button>
    </form>
  );
};


const DoctorList = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [bookedAppointments, setBookedAppointments] = useState<string[]>([])
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const { toast } = useToast()

  const handleAppointment = async (doctorId: string, doctorName: string) => {
    setLoadingStates(prev => ({...prev, [doctorId]: true}));
    const isBooked = bookedAppointments.includes(doctorId);

    try {
        const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doctorId, doctorName, action: isBooked ? 'cancel' : 'book' })
        });

        const data = await response.json();

        if (response.ok) {
            setBookedAppointments(prev => {
                if (isBooked) {
                    return prev.filter(id => id !== doctorId);
                } else {
                    return [...prev, doctorId];
                }
            });
            toast({
                title: data.message,
                description: `Your appointment with ${doctorName} has been ${isBooked ? 'cancelled' : 'confirmed'}.`,
            });
        } else {
            throw new Error(data.message || 'Failed to update appointment');
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        toast({
            variant: "destructive",
            title: "Action Failed",
            description: errorMessage,
        });
    } finally {
        setLoadingStates(prev => ({...prev, [doctorId]: false}));
    }
  }

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section id="doctors" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Meet Our Top Doctors</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Browse our list of experienced and highly-rated medical professionals.
            </p>
        </div>
        
        <div className="mx-auto max-w-xl mt-8 mb-12">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search by name or specialty..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10"
                />
            </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredDoctors.map(doctor => {
                const isBooked = bookedAppointments.includes(doctor.id);
                const isLoading = loadingStates[doctor.id];
                return (
                    <Card key={doctor.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                        <CardHeader className="items-center text-center">
                            <Image
                                src={doctor.image}
                                alt={`Dr. ${doctor.name}`}
                                data-ai-hint="doctor portrait"
                                width={80}
                                height={80}
                                className="rounded-full border-4 border-primary/20"
                            />
                            <CardTitle>{doctor.name}</CardTitle>
                            <Badge variant="secondary" className="flex items-center gap-1.5">
                                {doctor.icon && <doctor.icon className="h-4 w-4" />}
                                {doctor.specialty}
                            </Badge>
                        </CardHeader>
                        <CardContent className="text-center space-y-4 flex-grow flex flex-col justify-between">
                            <div>
                                <div className="flex justify-center items-center gap-2">
                                   <StarRating rating={doctor.rating} />
                                   <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">{doctor.bio}</p>
                            </div>
                            <div className="flex flex-col gap-2 mt-4">
                                <Button 
                                    className="w-full"
                                    variant={isBooked ? 'destructive' : 'default'}
                                    onClick={() => handleAppointment(doctor.id, doctor.name)}
                                    disabled={isLoading}
                                >
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isBooked ? 'Cancel Appointment' : 'Book Appointment'}
                                </Button>
                                 <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full">
                                            <MessageSquare className="mr-2 h-4 w-4"/>
                                            Leave Feedback
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Leave Feedback for {doctor.name}</DialogTitle>
                                        </DialogHeader>
                                         <DialogClose asChild>
                                            {(closeRef) => (
                                              <FeedbackForm 
                                                  doctorName={doctor.name} 
                                                  onSubmitSuccess={() => (closeRef.ref as React.RefObject<HTMLButtonElement>).current?.click()}
                                              />
                                            )}
                                          </DialogClose>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
        {filteredDoctors.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">No doctors found matching your search.</p>
        )}
      </div>
    </section>
  )
}

export default DoctorList;
