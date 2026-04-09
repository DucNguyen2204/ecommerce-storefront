import { gql } from '@apollo/client/core';

const ORDER_FIELDS = gql`
  fragment OrderFields on Order {
    id
    totalAmount
    status
    shippingAddress
    createdAt
    updatedAt
    items {
      id
      quantity
      unitPrice
      subtotal
      product {
        id
        name
        sku
      }
    }
  }
`;

export const MY_ORDERS_QUERY = gql`
  ${ORDER_FIELDS}
  query MyOrders {
    myOrders {
      ...OrderFields
    }
  }
`;

export const ORDER_QUERY = gql`
  ${ORDER_FIELDS}
  query Order($id: ID!) {
    order(id: $id) {
      ...OrderFields
    }
  }
`;

export const PLACE_ORDER_MUTATION = gql`
  ${ORDER_FIELDS}
  mutation PlaceOrder($input: PlaceOrderInput!) {
    placeOrder(input: $input) {
      ...OrderFields
    }
  }
`;

export const CANCEL_ORDER_MUTATION = gql`
  ${ORDER_FIELDS}
  mutation CancelOrder($orderId: ID!) {
    cancelOrder(orderId: $orderId) {
      ...OrderFields
    }
  }
`;
