import { gql } from '@apollo/client/core';

const CART_FIELDS = gql`
  fragment CartFields on Cart {
    id
    totalAmount
    items {
      id
      quantity
      unitPrice
      subtotal
      product {
        id
        name
        price
        stockQuantity
        sku
      }
    }
  }
`;

export const MY_CART_QUERY = gql`
  ${CART_FIELDS}
  query MyCart {
    myCart {
      ...CartFields
    }
  }
`;

export const ADD_TO_CART_MUTATION = gql`
  ${CART_FIELDS}
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      ...CartFields
    }
  }
`;

export const UPDATE_CART_ITEM_MUTATION = gql`
  ${CART_FIELDS}
  mutation UpdateCartItem($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
      ...CartFields
    }
  }
`;

export const REMOVE_FROM_CART_MUTATION = gql`
  ${CART_FIELDS}
  mutation RemoveFromCart($cartItemId: ID!) {
    removeFromCart(cartItemId: $cartItemId) {
      ...CartFields
    }
  }
`;

export const CLEAR_CART_MUTATION = gql`
  mutation ClearCart {
    clearCart
  }
`;
