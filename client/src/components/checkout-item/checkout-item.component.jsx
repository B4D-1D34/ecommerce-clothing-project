import React from "react";
import { connect } from "react-redux";
import { addItem, clearItem, removeItem } from "../../redux/cart/cart.actions";

import {
  CheckoutItemContainer,
  ImageContainer,
  RemoveButtonContainer,
  QuantityContainer,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem, clearItem, removeItem, addItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt="item" />
      </ImageContainer>
      <span>{name}</span>
      <QuantityContainer>
        {quantity > 1 ? (
          <div className="arrow" onClick={() => removeItem(cartItem)}>
            &#10094;
          </div>
        ) : (
          <div className="disabled-arrow">&#10094;</div>
        )}
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </QuantityContainer>
      <span>${price}</span>
      <RemoveButtonContainer onClick={() => clearItem(cartItem)}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItem(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
