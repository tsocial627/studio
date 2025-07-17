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
