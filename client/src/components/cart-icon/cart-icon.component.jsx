import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleDropdown } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import {
  CartIconContainer,
  ItemCountContainer,
  ShoppingIconContainer,
} from "./cart-icon.styles";

const CartIcon = ({ toggleDropdown, itemCount }) => (
  <CartIconContainer onClick={toggleDropdown}>
    <ShoppingIconContainer />
    <ItemCountContainer>{itemCount}</ItemCountContainer>
  </CartIconContainer>
);

const mapDispatchToProps = (dispatch) => ({
  toggleDropdown: () => dispatch(toggleDropdown()),
});

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
