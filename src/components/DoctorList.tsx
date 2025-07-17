"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Star, Search, HeartPulse, Stethoscope, Brain, Bone } from "lucide-react"
import type { Doctor } from "@/lib/types"
import { Button } from "./ui/button"

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Evelyn Reed",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 128,
    image: "https://placehold.co/100x100.png",
    bio: "Specializes in heart-related conditions and preventative care. Over 15 years of experience.",
    icon: HeartPulse,
  },
  {
    id: "2",
    name: "Dr. Marcus Thorne",
    specialty: "Neurologist",
    rating: 4.8,
    reviews: 94,
    image: "https://placehold.co/100x100.png",
    bio: "Expert in treating disorders of the nervous system, including stroke and epilepsy.",
    icon: Brain,
  },
  {
    id: "3",
    name: "Dr. Anya Sharma",
    specialty: "General Physician",
    rating: 4.9,
    reviews: 210,
    image: "https://placehold.co/100x100.png",
    bio: "Provides comprehensive primary care for patients of all ages. Your family's health partner.",
    icon: Stethoscope,
  },
  {
    id: "4",
    name: "Dr. James Carter",
    specialty: "Orthopedic Surgeon",
    rating: 4.7,
    reviews: 76,
    image: "https://placehold.co/100x100.png",
    bio: "Skilled in surgical and non-surgical treatment of musculoskeletal injuries.",
    icon: Bone,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
);

const DoctorList = () => {
  const [searchTerm, setSearchTerm] = useState("")
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
            {filteredDoctors.map(doctor => (
                <Card key={doctor.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                    <CardContent className="text-center space-y-4">
                        <div className="flex justify-center items-center gap-2">
                           <StarRating rating={doctor.rating} />
                           <span className="text-sm text-muted-foreground">({doctor.reviews} reviews)</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{doctor.bio}</p>
                        <Button className="w-full">Book Appointment</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
        {filteredDoctors.length === 0 && (
            <p className="text-center text-muted-foreground mt-8">No doctors found matching your search.</p>
        )}
      </div>
    </section>
  )
}

export default DoctorList;
