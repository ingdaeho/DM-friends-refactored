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
            <Checkbox id="All" checked={selectedAll} onChange={handleCheckAllItem} labelText={`??????`} />
            {/* <span>{cart.length}</span> */}
            <S.RemoveItems>
              {selectedItems.length}??? ??????
              <button onClick={handleDeleteSelectedItem}>
                <img alt="removeBtn" />
              </button>
            </S.RemoveItems>
          </S.TotalItem>
        </S.CartUpperSection>
        <S.CartLowerSection>
          <S.AddedItemsWrapper>
            {cart.length === 0 ? "??????????????? ???????????????" : null}
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
              <span>????????????</span>
              <select>
                <option value="??????">??????</option>
              </select>
            </S.Shipping>
            <S.Order>
              <div>??? ????????????</div>
              <div>{totalPrice.toLocaleString()}???</div>
            </S.Order>
            <S.Order>
              <div>?????????</div>
              <div>??????</div>
            </S.Order>
            <S.Total>
              <div>??? ????????????</div>
              <S.TotalPrice>{totalPrice.toLocaleString()}???</S.TotalPrice>
            </S.Total>
          </S.Payment>
        </S.CartLowerSection>
      </S.CartWrapper>
      <S.GoToPay>
        <span>{totalPrice.toLocaleString()}??? ?????? ??????</span>
      </S.GoToPay>
    </S.WholeContainer>
  );
};
export default Cart;
