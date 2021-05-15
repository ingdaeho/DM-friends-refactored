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

export interface ICartState {
  cart: ICart[];
  isLoading: boolean;
  error: Error | null;
}

export interface ICartRequest {
  user_id: number;
}

export interface IDeleteRequest extends ICartRequest {
  product_id: object[];
}

export interface IChangeQuantityRequest extends ICartRequest {
  cart_id: number;
  quantity: number;
}
