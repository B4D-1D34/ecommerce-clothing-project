import CartActionTypes from "./cart.types";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "./cart.utils";

const INITIAL_STATE = {
  dropdownIsShown: false,
  cartItems: [],
  error: null,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_DROPDOWN:
      return {
        ...state,
        dropdownIsShown: !state.dropdownIsShown,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEM:
      return {
        ...state,
        cartItems: clearItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    case CartActionTypes.CART_FETCH_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
        error: null,
      };
    case CartActionTypes.CART_FETCH_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
