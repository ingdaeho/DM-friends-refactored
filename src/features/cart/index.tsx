import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import * as S from "./styles";
import {
  getCartItemRequest,
  deleteCartItemRequest,
  changeQuantityRequest,
  selectCartItem,
  selectAllCartItem,
} from "@features/cart/cartSlice";
import { RootState } from "@app/rootReducer";
import Checkbox from "@components/Checkbox";

const Cart = () => {
  const dispatch = useDispatch();
  const { userId: user_id } = useParams<{ userId: string }>();
  const { cart } = useSelector((state: RootState) => state.cartSlice);

  const selectedAll = cart.every((item) => item.selected);
  const selectedItems = cart.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity;
  }, 0);

  useEffect(() => {
    dispatch(getCartItemRequest({ user_id }));
  }, [dispatch, , user_id]);

  const handleCheckItem = useCallback(
    (e) => {
      dispatch(selectCartItem(e));
    },
    [dispatch],
  );

  const handleCheckAllItem = useCallback(() => {
    dispatch(selectAllCartItem());
  }, [dispatch]);

  const handleQuantity = (e: { target: { value: number } }, id: number) => {
    const { value } = e.target;
    dispatch(changeQuantityRequest({ user_id, quantity: Number(value), cart_id: id }));
  };

  const handleDeleteItem = useCallback(
    (id: number) => {
      const findProductId = cart.filter((item) => item.id === id);
      const productIdArr = [];
      productIdArr.push({ product_id: findProductId?.[0].products.id });
      dispatch(deleteCartItemRequest({ product_id: productIdArr, user_id }));
    },
    [cart, dispatch, user_id],
  );

  const handleDeleteSelectedItem = useCallback(() => {
    const idsToDelete = selectedItems.map((item) => item.products.id);
    const productIdArr = [];
    for (let id of idsToDelete) {
      productIdArr.push({ product_id: id });
    }
    dispatch(deleteCartItemRequest({ product_id: productIdArr, user_id }));
  }, [dispatch, selectedItems, user_id]);

  return (
    <S.WholeContainer>
      <S.CartWrapper>
        <S.CartUpperSection>
          <S.TotalItem>
            <Checkbox id="All" checked={selectedAll} onChange={handleCheckAllItem} labelText={`전체`} />
            {/* <span>{cart.length}</span> */}
            <S.RemoveItems>
              {selectedItems.length}개 선택
              <button onClick={handleDeleteSelectedItem}>
                <img alt="removeBtn" />
              </button>
            </S.RemoveItems>
          </S.TotalItem>
        </S.CartUpperSection>
        <S.CartLowerSection>
          <S.AddedItemsWrapper>
            {cart.length === 0 ? "장바구니가 비었습니다" : null}
            {cart.map((item, index) => {
              return (
                <Product
                  key={index}
                  index={index}
                  item={item}
                  selectItem={handleCheckItem}
                  handleQuantity={handleQuantity}
                  handleDeleteItem={handleDeleteItem}
                />
              );
            })}
          </S.AddedItemsWrapper>
          <S.Payment>
            <S.Shipping>
              <span>배송국가</span>
              <select>
                <option value="한국">한국</option>
              </select>
            </S.Shipping>
            <S.Order>
              <div>총 주문금액</div>
              <div>{totalPrice.toLocaleString()}원</div>
            </S.Order>
            <S.Order>
              <div>배송비</div>
              <div>무료</div>
            </S.Order>
            <S.Total>
              <div>총 결제금액</div>
              <S.TotalPrice>{totalPrice.toLocaleString()}원</S.TotalPrice>
            </S.Total>
          </S.Payment>
        </S.CartLowerSection>
      </S.CartWrapper>
      <S.GoToPay>
        <span>{totalPrice.toLocaleString()}원 주문 하기</span>
      </S.GoToPay>
    </S.WholeContainer>
  );
};
export default Cart;
