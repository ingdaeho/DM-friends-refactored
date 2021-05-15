import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import * as S from "./styles";
import {
  getCartItemRequest,
  deleteCartItemRequest,
  changeQuantityRequest,
  selectEachItem,
  selectAllItem,
} from "@features/cart/cartSlice";
import { RootState } from "@app/rootReducer";

const Cart = () => {
  const dispatch = useDispatch();
  const { userId: user_id } = useParams<{ userId: string }>();
  const { cart } = useSelector((state: RootState) => state.cartSlice);

  const selectedAll = cart.reduce((result, item) => (result = result && item.selected), true);
  const selectedItems = cart.filter((item) => item.selected);
  const totalPrice = selectedItems
    ?.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0)
    .toLocaleString();

  useEffect(() => {
    dispatch(getCartItemRequest({ user_id }));
  }, [dispatch, , user_id]);

  const onSelectEachItem = useCallback(
    (e) => {
      dispatch(selectEachItem(e));
    },
    [dispatch],
  );

  const onSelectAllItems = useCallback(() => {
    dispatch(selectAllItem());
  }, [dispatch]);

  // console.log(cart);

  const deleteOneItem = useCallback(
    (id: number) => {
      const findProductId = cart.filter((item) => item.id == id);
      const idArr = [];
      idArr.push({ product_id: findProductId?.[0].products.id });
      dispatch(deleteCartItemRequest({ product_id: idArr, user_id }));
    },
    [cart, dispatch, user_id],
  );

  const deleteSelected = useCallback(() => {
    const itemsToDelete = cart.filter((item) => item.selected);
    const idsToDelete = itemsToDelete.map((item) => item.products.id);
    const productIdArr = [];
    if (idsToDelete) {
      for (let id of idsToDelete) {
        productIdArr.push({ product_id: id });
      }
    }
    dispatch(deleteCartItemRequest({ product_id: productIdArr, user_id }));
  }, [cart, dispatch, user_id]);

  const handleQuantity = (e: { target: { value: number } }, id: number) => {
    const { value } = e.target;
    if (cart) {
      for (let item of cart) {
        if (item.id === id) {
          item.quantity = value;
        }
      }
    }
    dispatch(changeQuantityRequest({ cart, user_id, quantity: value, cart_id: id }));
    // dispatch({ type: changeQuantityRequest, data: { cartItems, user_id, quantity: value, cart_id: id } });
  };

  return (
    <S.WholeContainer>
      <S.CartWrapper>
        <S.CartUpperSection>
          <S.TotalItem>
            <S.SelectedItem>
              <input type="checkbox" id="checkAllProducts" checked={selectedAll} onChange={onSelectAllItems} />
              <label htmlFor="checkAllProducts">
                <span></span>
                전체
              </label>
              <span>{cart?.length}</span>
            </S.SelectedItem>
            <S.RemoveItems>
              {selectedItems.length}개 선택
              <button onClick={deleteSelected}>
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
                  selectItem={onSelectEachItem}
                  handleQuantity={handleQuantity}
                  deleteOneItem={deleteOneItem}
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
        <span>{totalPrice}원 주문 하기</span>
      </S.GoToPay>
    </S.WholeContainer>
  );
};
export default Cart;
