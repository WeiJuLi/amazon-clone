export const initialState = {
  basket: [],
  user: null, // 初始無user logs in
};

export const getBasketTotal = (basket) =>
  basket?.reduce(
    (amount, item) => item.price1 + item.price2 * 0.01 + amount,
    0
  );

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn("Can't remove it.");
      }
      return { ...state, basket: newBasket };

    case "SET_USER":
      return {
        ...state,
        user: action.user, // update state.user by action.user. // inside the dispatch function is an action
      };
    default:
      return state;
  }
};

export default reducer;
