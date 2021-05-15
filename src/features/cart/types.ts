export interface ICart {
  id: number;
  price: number;
  products: {
    id: number;
    name: string;
    product_images: [
      {
        image_url: string;
      },
    ];
  };
  quantity: number;
  selected: boolean;
}

export interface ICartRequest {
  user_id: number;
  product_id?: number | number[];
  cart_id?: number;
  quantity?: number;
}

export interface ICartState {
  cart: ICart[];
  isLoading: boolean;
  error: Error | null;
}

export interface IDeleteRequest {
  user_id: number;
  product_id: object[];
}
