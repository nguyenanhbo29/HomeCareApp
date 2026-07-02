export interface Service {
  id: string;
  name: string;
  category: string;
  image: string;

  price: number;
  rating: number;
  duration: string;

  description?: string;

  isFavorite?: boolean;
}