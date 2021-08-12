import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleDropdown } from "../../redux/cart/cart.actions";

import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../custom-button/custom-button.component";
import { withRouter } from "react-router-dom";

import {
  CartDropdownContainer,
  CartItemsContainer,
  EmptyMessageContainer,
} from "./cart-dropdown.styles";

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
      )}
    </CartItemsContainer>

    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleDropdown());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
