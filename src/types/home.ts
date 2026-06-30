export interface Category {
  id: string;
  title: string;
  icon: string;
  color: string;
}

export interface Service {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  category: string;
  isFavorite?: boolean;
}