import React from "react";

import { connect } from "react-redux";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import {
  selectCartItems,
  selectDropdownIsShown,
} from "../../redux/cart/cart.selectors";
import { createStructuredSelector } from "reselect";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";
import { signOutStart } from "../../redux/user/user.actions";

const Header = ({ currentUser, dropdownIsShown, cartItems, signOutStart }) => {
  let id = null;
  if (currentUser) {
    id = currentUser.id;
  }
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/contact">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as="div" onClick={() => signOutStart({ cartItems, id })}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {dropdownIsShown ? <CartDropdown /> : null}
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  dropdownIsShown: selectDropdownIsShown,
  cartItems: selectCartItems,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: (cartItemsAndUser) => dispatch(signOutStart(cartItemsAndUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
