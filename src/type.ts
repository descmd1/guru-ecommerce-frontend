
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface CartItem {
  productId: Product;
  quantity: number;
}
