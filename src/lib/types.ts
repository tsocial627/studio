export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  bio: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type MedicalReport = {
  id: string;
  name: string;
  date: string;
  doctor: string;
};
