import { all, call, takeLatest, put } from "@redux-saga/core/effects";
import { createUserProfileCart } from "../../firebase/firebase.utils";

import UserActionTypes from "../user/user.types";
import { cartFetchFailure, cartFetchSuccess, clearCart } from "./cart.actions";

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* getCartFromStore({ payload: { id } }) {
  try {
    const cartRef = yield call(createUserProfileCart, id);
    const cartSnapshot = yield cartRef.get();
    yield put(cartFetchSuccess({ ...cartSnapshot.data() }));
  } catch (error) {
    yield put(cartFetchFailure(error));
  }
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* onSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, getCartFromStore);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess), call(onSignInSuccess)]);
}
