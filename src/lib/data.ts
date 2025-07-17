import type { Doctor } from "@/lib/types";
import { Bone, Brain, HeartPulse, Stethoscope } from "lucide-react";

export const doctors: Doctor[] = [
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
  