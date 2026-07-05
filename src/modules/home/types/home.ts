export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;

  category: Category;

  price: number;
  rating: number;
  reviews: number;
  duration: string;

  icon: string;
  color: string;
  badge?: string;

  isFavorite?: boolean;
}