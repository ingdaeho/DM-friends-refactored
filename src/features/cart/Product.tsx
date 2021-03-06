import { useEffect, useState, FC, memo } from "react";
import { ICart } from "@features/cart/types";
import { Item, ImageBox, ItemInfo, Price, Quantity } from "./styles";
import Checkbox from "@components/Checkbox";

interface Props {
  index: number;
  item: ICart;
  selectItem: (index: number) => void;
  handleDeleteItem: (id: number) => void;
  handleQuantity: (e: any, index: number) => void;
}
const Product: FC<Props> = ({ index, item, selectItem, handleDeleteItem, handleQuantity }) => {
  const [quantityRange, setQuantityRange] = useState<number[]>([]);

  useEffect(() => {
    initQuantity();
  }, []);

  const initQuantity = () => {
    const itemQuantities = [];
    for (let i = 1; i < 1000; i++) {
      itemQuantities.push(i);
    }
    setQuantityRange(itemQuantities);
  };

  return (
    <Item key={index}>
      <Checkbox id={item.id} checked={item.selected} onChange={() => selectItem(item.id)} />
      <ImageBox>
        <img src={item.products.product_images[0]?.image_url} alt="product_images" />
      </ImageBox>
      <ItemInfo>
        <div>
          {item.products.name}
          <button className="deleteItem" onClick={() => handleDeleteItem(item.id)}>
            <img alt="deleteBtn" />
          </button>
        </div>
        <Price>{item.price.toLocaleString()}원</Price>
        <Quantity value={item.quantity} onChange={(e) => handleQuantity(e, item.id)}>
          {quantityRange.map((number, idx) => {
            return (
              <option key={idx} value={number}>
                {number}
              </option>
            );
          })}
        </Quantity>
      </ItemInfo>
    </Item>
  );
};
export default memo(Product);
