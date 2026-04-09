import { gql } from '@apollo/client/core';

const PRODUCT_FIELDS = gql`
  fragment ProductFields on Product {
    id
    name
    description
    price
    stockQuantity
    sku
    active
    createdAt
    category {
      id
      name
      slug
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  ${PRODUCT_FIELDS}
  query Products($page: Int, $size: Int, $categoryId: ID, $search: String) {
    products(page: $page, size: $size, categoryId: $categoryId, search: $search) {
      content {
        ...ProductFields
      }
      totalElements
      totalPages
      page
      size
    }
  }
`;

export const PRODUCT_QUERY = gql`
  ${PRODUCT_FIELDS}
  query Product($id: ID!) {
    product(id: $id) {
      ...ProductFields
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      name
      slug
    }
  }
`;
