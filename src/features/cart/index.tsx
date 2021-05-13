import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ICart } from "@features/cart/types";
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
  getCartItemRequest,
  deleteCartItemRequest,
  deleteSelectedItemsRequest,
  changeQuantityRequest,
  selectAllRequest,
  selectEach,
} from "@features/cart/cartSlice";
import { RootState } from "@app/rootReducer";

const Cart = () => {
  const dispatch = useDispatch();
  // const { userId: user_id } = useParams<{ userId: string }>();
  // const { cart, selectAll } = useSelector((state: RootState) => state.cartSlice);

  // const selectedAll = cartData?.reduce((result, item) => (result = result && item.selected), true);
  // const selectedItems = cart?.filter((item) => item.selected);
  // const totalPrice = selectedItems
  //   ?.reduce((acc, cur) => {
  //     return acc + cur.price * cur.quantity;
  //   }, 0)
  //   .toLocaleString();

  // useEffect(() => {
  //   dispatch(getCartItemRequest({ user_id }));
  // }, [dispatch, , user_id]);

  // const selectAll = useCallback(() => {
  //   dispatch(selectAllRequest({ cartData }));
  // }, [cartData, dispatch, selectedAll]);

  // const selectAll = useCallback(() => {
  //   cartData?.reduce((result, item) => (result = result && item.selected), true)
  //     ? cartData?.map((item) => {
  //         item.selected = false;
  //         return item;
  //       })
  //     : cartData?.map((item) => {
  //         item.selected = true;
  //         return item;
  //       });
  // }, [cartData]);

  // const selectItem = useCallback(
  //   (id: number) => {
  //       if (cartData) {
  //         for (let item of cartData) {
  //           if (item.id === id) {
  //             item.selected = !item.selected;
  //           }
  //         }
  //       }
  //     dispatch(selectEach({ id, cartData }));
  //   },
  //   [cartData],
  // );

  // const deleteOneItem = useCallback(
  //   (id: number) => {
  //     const findProductId = cartData?.filter((item: cart) => item.id == id);
  //     const idArr = [];
  //     idArr.push({ product_id: findProductId?.[0].products.id });
  //     dispatch(deleteCartItemRequest({ product_id: idArr, user_id }));
  //   },
  //   [cartData, dispatch, user_id],
  // );

  // const deleteSelected = useCallback(() => {
  //   const itemsToDelete = cartData?.filter((item: cart) => item.selected);
  //   const idsToDelete = itemsToDelete?.map((item: cart) => item.products.id);
  //   const productIdArr = [];
  //   if (idsToDelete) {
  //     for (let id of idsToDelete) {
  //       productIdArr.push({ product_id: id });
  //     }
  //   }
  //   dispatch(deleteSelectedItemsRequest({ product_id: productIdArr, user_id }));
  //   dispatch(getCartItemRequest({ user_id }));
  // }, [cartData, dispatch, user_id]);

  // const handleQuantity = (e: { target: { value: number } }, id: number) => {
  //   const { value } = e.target;
  //   if (cartData) {
  //     for (let item of cartData) {
  //       if (item.id === id) {
  //         item.quantity = value;
  //       }
  //     }
  //   }
  //   dispatch(changeQuantityRequest({ cartData, user_id, quantity: value, cart_id: id }));
  //   dispatch({ type: changeQuantityRequest, data: { cartItems, user_id, quantity: value, cart_id: id } });
  // };

  return (
    <WholeContainer>
      {/* <CartWrapper>
        <CartUpperSection>
          <TotalItem>
            <SelectedItem>
              <input type="checkbox" id="checkAllProducts" checked={selectedAll} onChange={selectAll} />
              <label htmlFor="checkAllProducts">
                <span></span>
                전체
              </label>
              <span>{cartData?.length}</span>
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
            {cartData?.length === 0 ? "장바구니가 비었습니다" : null}
            {cartData?.map((item, index) => {
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
      </GoToPay> */}
    </WholeContainer>
  );
};
export default Cart;
