export interface AddProductRequest {
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
}

export interface AddProductResponse extends AddProductRequest {
  id: number;
}

export interface AddProductWithoutTitleResponse {
  id: number;
  description: string;
  price: number;
  brand: string;
  category: string;
}

export interface EmptyProductResponse {
  id: number;
}

export interface ProductResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  brand?: string;
  category: string;
  rating?: number;
  stock?: number;
  thumbnail?: string;
  images?: string[];
}
