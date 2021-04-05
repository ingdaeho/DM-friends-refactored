import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cart } from "@typings/db";
import Product from "./Product";
import {
  WholeContainer,
  CartWrapper,
  CartUpperSection,
  TotalItem,
  SelectedItem,
  RemoveItems,
  CartLowerSection,
  AddedItemsWrapper,
  Payment,
  Shipping,
  Order,
  Total,
  TotalPrice,
  GoToPay,
} from "./styles";
import {
  CHANGE_QUANTITY_REQUEST,
  DELETE_ITEM_REQUEST,
  DELETE_SELECTED_ITEMS_REQUEST,
  GET_CART_ITEM_REQUEST,
} from "@store/reducers/cart";

const Cart = () => {
  const dispatch = useDispatch();
  const { userId: user_id } = useParams<{ userId: any }>();
  const { cartData } = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState<cart[]>([]);

  const selectedAll = cartItems?.reduce((result, item) => (result = result && item.selected), true);
  const selectedItems = cartItems?.filter((item) => item.selected);
  const totalPrice = selectedItems
    ?.reduce((acc, cur) => {
      return acc + Number(cur.price * cur.quantity);
    }, 0)
    .toLocaleString();

  useEffect(() => {
    dispatch({ type: GET_CART_ITEM_REQUEST, data: { user_id } });
  }, []);

  useEffect(() => {
    if (cartData !== null) {
      setCartItems(cartData);
    }
  }, [cartData]);

  const selectAll = useCallback(() => {
    cartItems.reduce((result, item) => (result = result && item.selected), true)
      ? cartItems.map((item) => {
          item.selected = false;
          return item;
        })
      : cartItems.map((item) => {
          item.selected = true;
          return item;
        });
    setCartItems([...cartItems]);
  }, [cartItems]);

  const selectItem = useCallback(
    (id: number) => {
      for (let item of cartItems) {
        if (item.id === id) {
          item.selected = !item.selected;
        }
      }
      setCartItems([...cartItems]);
    },
    [cartItems],
  );

  const deleteOneItem = useCallback(
    (id: number) => {
      const findProductId = cartItems.filter((item: cart) => item.id == id);
      const idArr = [];
      idArr.push({ product_id: findProductId[0].products.id });
      dispatch({ type: DELETE_ITEM_REQUEST, data: { product_id: idArr, user_id, cart_id: id } });
    },
    [cartItems],
  );

  const deleteSelected = useCallback(() => {
    const itemsToDelete = cartItems.filter((item: cart) => item.selected);
    const idsToDelete = itemsToDelete.map((item: cart) => item.products.id);
    const productIdArr = [];
    for (let id of idsToDelete) {
      productIdArr.push({ product_id: id });
    }
    dispatch({ type: DELETE_SELECTED_ITEMS_REQUEST, data: { product_id: productIdArr, user_id } });
    dispatch({ type: GET_CART_ITEM_REQUEST, data: { user_id } });
  }, [cartItems]);

  const handleQuantity = (e: { target: { value: number } }, id: number) => {
    const { value } = e.target;
    for (let item of cartItems) {
      if (item.id === id) {
        item.quantity = Number(value);
      }
    }
    dispatch({ type: CHANGE_QUANTITY_REQUEST, data: { cartItems, user_id, quantity: value, cart_id: id } });
  };

  return (
    <WholeContainer>
      <CartWrapper>
        <CartUpperSection>
          <TotalItem>
            <SelectedItem>
              <input type="checkbox" id="checkAllProducts" checked={selectedAll} onChange={selectAll} />
              <label htmlFor="checkAllProducts">
                <span></span>
                전체
              </label>
              <span>{cartItems?.length}</span>
            </SelectedItem>
            <RemoveItems>
              {selectedItems?.length}개 선택
              <button onClick={deleteSelected}>
                <img alt="removeBtn" />
              </button>
            </RemoveItems>
          </TotalItem>
        </CartUpperSection>
        <CartLowerSection>
          <AddedItemsWrapper>
            {cartItems.length === 0 ? "장바구니가 비었습니다" : null}
            {cartItems?.map((item, index) => {
              return (
                <Product
                  key={index}
                  index={index}
                  item={item}
                  selectItem={selectItem}
                  handleQuantity={handleQuantity}
                  deleteOneItem={deleteOneItem}
                />
              );
            })}
          </AddedItemsWrapper>
          <Payment>
            <Shipping>
              <span>배송국가</span>
              <select>
                <option value="한국">한국</option>
              </select>
            </Shipping>
            <Order>
              <div>총 주문금액</div>
              <div>{totalPrice?.toLocaleString()}원</div>
            </Order>
            <Order>
              <div>배송비</div>
              <div>무료</div>
            </Order>
            <Total>
              <div>총 결제금액</div>
              <TotalPrice>{totalPrice?.toLocaleString()}원</TotalPrice>
            </Total>
          </Payment>
        </CartLowerSection>
      </CartWrapper>
      <GoToPay>
        <span>{totalPrice}원 주문 하기</span>
      </GoToPay>
    </WholeContainer>
  );
};
export default Cart;
