import { produce, setAutoFreeze } from "immer";

setAutoFreeze(false);

export const INITIAL_STATE = {
  getCartItemLoading: false,
  getCartItemDone: false,
  getCartItemError: null,
  deleteItemLoading: false,
  deleteItemDone: false,
  deleteItemError: null,
  deleteSelectedItemLoading: false,
  deleteSelectedItemDone: false,
  deleteSelectedItemError: null,
  changeQuantityLoading: false,
  changeQuantityDone: false,
  changeQuantityError: null,
  cartData: null || [],
};

export const GET_CART_ITEM_REQUEST = "GET_CART_ITEM_REQUEST";
export const GET_CART_ITEM_SUCCESS = "GET_CART_ITEM_SUCCESS";
export const GET_CART_ITEM_FAILURE = "GET_CART_ITEM_FAILURE";

export const DELETE_ITEM_REQUEST = "DELETE_ITEM_REQUEST";
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const DELETE_ITEM_FAILURE = "DELETE_ITEM_FAILURE";

export const DELETE_SELECTED_ITEMS_REQUEST = "DELETE_SELECTED_ITEM_REQUEST";
export const DELETE_SELECTED_ITEMS_SUCCESS = "DELETE_SELECTED_ITEM_SUCCESS";
export const DELETE_SELECTED_ITEMS_FAILURE = "DELETE_SELECTED_ITEM_FAILURE";

export const CHANGE_QUANTITY_REQUEST = "CHANGE_QUANTITY_REQUEST";
export const CHANGE_QUANTITY_SUCCESS = "CHANGE_QUANTITY_SUCCESS";
export const CHANGE_QUANTITY_FAILURE = "CHANGE_QUANTITY_FAILURE";

const reducer = (state = INITIAL_STATE, action: { type: any; data: any; error: null }) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_CART_ITEM_REQUEST:
        draft.getCartItemLoading = true;
        draft.getCartItemError = null;
        draft.getCartItemDone = false;
        break;
      case GET_CART_ITEM_SUCCESS:
        draft.getCartItemLoading = false;
        draft.getCartItemDone = true;
        draft.cartData = action.data;
        break;
      case GET_CART_ITEM_FAILURE:
        draft.getCartItemLoading = false;
        draft.getCartItemError = action.error;
        break;
      case DELETE_ITEM_REQUEST:
        draft.deleteItemLoading = true;
        draft.deleteItemDone = false;
        draft.deleteItemError = null;
        break;
      case DELETE_ITEM_SUCCESS:
        draft.deleteItemLoading = false;
        draft.deleteItemDone = true;
        draft.cartData = draft.cartData?.filter((item: { id: number }) => item.id !== action.data.cart_id);
        break;
      case DELETE_ITEM_FAILURE:
        draft.getCartItemLoading = false;
        draft.getCartItemError = action.error;
        break;
      case DELETE_SELECTED_ITEMS_REQUEST:
        draft.deleteSelectedItemLoading = true;
        draft.deleteSelectedItemDone = false;
        draft.deleteSelectedItemError = null;
        break;
      case DELETE_SELECTED_ITEMS_SUCCESS:
        draft.deleteSelectedItemLoading = false;
        draft.deleteSelectedItemDone = true;
        break;
      case DELETE_SELECTED_ITEMS_FAILURE:
        draft.deleteSelectedItemLoading = false;
        draft.deleteSelectedItemError = action.error;
        break;
      case CHANGE_QUANTITY_REQUEST:
        draft.changeQuantityLoading = true;
        draft.changeQuantityDone = false;
        draft.changeQuantityError = null;
        break;
      case CHANGE_QUANTITY_SUCCESS:
        draft.changeQuantityLoading = false;
        draft.changeQuantityDone = true;
        draft.cartData = action.data;
        break;
      case CHANGE_QUANTITY_FAILURE:
        draft.changeQuantityLoading = false;
        draft.changeQuantityError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
