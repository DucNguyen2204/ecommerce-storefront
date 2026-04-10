import { AuthPayload, Cart, Category, Order, Product, ProductPage, User } from '../models';

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Electronics', slug: 'electronics' },
  { id: 'cat-2', name: 'Clothing', slug: 'clothing' },
  { id: 'cat-3', name: 'Books', slug: 'books' },
  { id: 'cat-4', name: 'Home & Kitchen', slug: 'home-kitchen' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Wireless Noise-Cancelling Headphones',
    description:
      'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and Hi-Res audio support. Foldable design for travel.',
    price: 249.99,
    stockQuantity: 42,
    sku: 'ELEC-HP-001',
    imageUrl: 'https://picsum.photos/seed/ELEC-HP-001/400/400',
    category: MOCK_CATEGORIES[0],
    active: true,
    createdAt: '2025-01-10T08:00:00Z',
  },
  {
    id: 'prod-2',
    name: '4K Ultra HD Smart TV 55"',
    description:
      '55-inch 4K UHD Smart TV with HDR10+, built-in streaming apps, voice control, and a 120Hz refresh rate panel.',
    price: 699.99,
    stockQuantity: 15,
    sku: 'ELEC-TV-001',
    imageUrl: 'https://picsum.photos/seed/ELEC-TV-001/400/400',
    category: MOCK_CATEGORIES[0],
    active: true,
    createdAt: '2025-01-12T08:00:00Z',
  },
  {
    id: 'prod-3',
    name: 'Mechanical Keyboard TKL',
    description:
      'Tenkeyless mechanical keyboard with Cherry MX Brown switches, RGB per-key backlighting, and aluminium top frame.',
    price: 119.99,
    stockQuantity: 78,
    sku: 'ELEC-KB-001',
    imageUrl: 'https://picsum.photos/seed/ELEC-KB-001/400/400',
    category: MOCK_CATEGORIES[0],
    active: true,
    createdAt: '2025-01-15T08:00:00Z',
  },
  {
    id: 'prod-4',
    name: 'Portable Bluetooth Speaker',
    description:
      '360° surround sound, waterproof IPX7, 24-hour playtime, and built-in powerbank. Weighs only 540g.',
    price: 89.99,
    stockQuantity: 63,
    sku: 'ELEC-SP-001',
    imageUrl: 'https://picsum.photos/seed/ELEC-SP-001/400/400',
    category: MOCK_CATEGORIES[0],
    active: true,
    createdAt: '2025-01-18T08:00:00Z',
  },
  {
    id: 'prod-5',
    name: "Men's Classic Oxford Shirt",
    description:
      '100% premium cotton oxford shirt. Slim fit, button-down collar. Available in multiple colours. Machine washable.',
    price: 49.99,
    stockQuantity: 120,
    sku: 'CLTH-MS-001',
    imageUrl: 'https://picsum.photos/seed/CLTH-MS-001/400/400',
    category: MOCK_CATEGORIES[1],
    active: true,
    createdAt: '2025-02-01T08:00:00Z',
  },
  {
    id: 'prod-6',
    name: "Women's Running Jacket",
    description:
      'Lightweight wind and water-resistant running jacket with reflective details, mesh ventilation, and a packable hood.',
    price: 79.99,
    stockQuantity: 55,
    sku: 'CLTH-WJ-001',
    imageUrl: 'https://picsum.photos/seed/CLTH-WJ-001/400/400',
    category: MOCK_CATEGORIES[1],
    active: true,
    createdAt: '2025-02-05T08:00:00Z',
  },
  {
    id: 'prod-7',
    name: 'Slim Fit Chino Trousers',
    description:
      'Stretch-cotton chinos in a modern slim fit. Ideal for smart-casual occasions. Available in navy, khaki, and olive.',
    price: 59.99,
    stockQuantity: 88,
    sku: 'CLTH-PT-001',
    imageUrl: 'https://picsum.photos/seed/CLTH-PT-001/400/400',
    category: MOCK_CATEGORIES[1],
    active: true,
    createdAt: '2025-02-10T08:00:00Z',
  },
  {
    id: 'prod-8',
    name: 'Clean Code',
    description:
      'A Handbook of Agile Software Craftsmanship by Robert C. Martin. Essential reading for every professional developer.',
    price: 34.99,
    stockQuantity: 200,
    sku: 'BOOK-CC-001',
    imageUrl: 'https://picsum.photos/seed/BOOK-CC-001/400/400',
    category: MOCK_CATEGORIES[2],
    active: true,
    createdAt: '2025-02-15T08:00:00Z',
  },
  {
    id: 'prod-9',
    name: 'Designing Data-Intensive Applications',
    description:
      "Martin Kleppmann's definitive guide to scalable, reliable, and maintainable systems. Covers distributed databases, stream processing, and more.",
    price: 54.99,
    stockQuantity: 150,
    sku: 'BOOK-DDIA-001',
    imageUrl: 'https://picsum.photos/seed/BOOK-DDIA-001/400/400',
    category: MOCK_CATEGORIES[2],
    active: true,
    createdAt: '2025-02-20T08:00:00Z',
  },
  {
    id: 'prod-10',
    name: 'The Pragmatic Programmer',
    description:
      'Your Journey to Mastery — 20th Anniversary Edition. Tips and tricks from two of the most experienced developers in the industry.',
    price: 44.99,
    stockQuantity: 175,
    sku: 'BOOK-PP-001',
    imageUrl: 'https://picsum.photos/seed/BOOK-PP-001/400/400',
    category: MOCK_CATEGORIES[2],
    active: true,
    createdAt: '2025-02-25T08:00:00Z',
  },
  {
    id: 'prod-11',
    name: 'Stainless Steel Cookware Set (10-Piece)',
    description:
      'Professional-grade tri-ply stainless steel cookware. Induction compatible, oven safe to 500°F. Includes pots, pans, and lids.',
    price: 189.99,
    stockQuantity: 30,
    sku: 'HOME-CW-001',
    imageUrl: 'https://picsum.photos/seed/HOME-CW-001/400/400',
    category: MOCK_CATEGORIES[3],
    active: true,
    createdAt: '2025-03-01T08:00:00Z',
  },
  {
    id: 'prod-12',
    name: 'Smart Coffee Maker',
    description:
      'Programmable 12-cup coffee maker with Wi-Fi, app control, built-in grinder, and thermal carafe. Brew from bed.',
    price: 129.99,
    stockQuantity: 45,
    sku: 'HOME-CF-001',
    imageUrl: 'https://picsum.photos/seed/HOME-CF-001/400/400',
    category: MOCK_CATEGORIES[3],
    active: true,
    createdAt: '2025-03-05T08:00:00Z',
  },
];

export const MOCK_USER: User = {
  id: 'user-1',
  email: 'demo@example.com',
  firstName: 'Alex',
  lastName: 'Demo',
  role: 'CUSTOMER',
  createdAt: '2025-01-01T00:00:00Z',
};

export const MOCK_AUTH_PAYLOAD: AuthPayload = {
  token: 'mock-jwt-token-demo',
  user: MOCK_USER,
};

export const MOCK_INITIAL_CART: Cart = {
  id: 'cart-1',
  items: [
    {
      id: 'ci-1',
      product: MOCK_PRODUCTS[0],
      quantity: 1,
      unitPrice: MOCK_PRODUCTS[0].price,
      subtotal: MOCK_PRODUCTS[0].price,
    },
    {
      id: 'ci-2',
      product: MOCK_PRODUCTS[7],
      quantity: 2,
      unitPrice: MOCK_PRODUCTS[7].price,
      subtotal: MOCK_PRODUCTS[7].price * 2,
    },
  ],
  totalAmount: MOCK_PRODUCTS[0].price + MOCK_PRODUCTS[7].price * 2,
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'order-1',
    user: MOCK_USER,
    items: [
      {
        id: 'oi-1',
        product: MOCK_PRODUCTS[1],
        quantity: 1,
        unitPrice: MOCK_PRODUCTS[1].price,
        subtotal: MOCK_PRODUCTS[1].price,
      },
      {
        id: 'oi-2',
        product: MOCK_PRODUCTS[4],
        quantity: 2,
        unitPrice: MOCK_PRODUCTS[4].price,
        subtotal: MOCK_PRODUCTS[4].price * 2,
      },
    ],
    totalAmount: MOCK_PRODUCTS[1].price + MOCK_PRODUCTS[4].price * 2,
    status: 'DELIVERED',
    shippingAddress: '123 Main Street, San Francisco, CA 94105',
    createdAt: '2025-03-10T10:00:00Z',
    updatedAt: '2025-03-15T14:30:00Z',
  },
  {
    id: 'order-2',
    user: MOCK_USER,
    items: [
      {
        id: 'oi-3',
        product: MOCK_PRODUCTS[8],
        quantity: 1,
        unitPrice: MOCK_PRODUCTS[8].price,
        subtotal: MOCK_PRODUCTS[8].price,
      },
    ],
    totalAmount: MOCK_PRODUCTS[8].price,
    status: 'SHIPPED',
    shippingAddress: '456 Oak Avenue, Austin, TX 78701',
    createdAt: '2025-04-01T09:00:00Z',
    updatedAt: '2025-04-03T11:00:00Z',
  },
  {
    id: 'order-3',
    user: MOCK_USER,
    items: [
      {
        id: 'oi-4',
        product: MOCK_PRODUCTS[2],
        quantity: 1,
        unitPrice: MOCK_PRODUCTS[2].price,
        subtotal: MOCK_PRODUCTS[2].price,
      },
      {
        id: 'oi-5',
        product: MOCK_PRODUCTS[11],
        quantity: 1,
        unitPrice: MOCK_PRODUCTS[11].price,
        subtotal: MOCK_PRODUCTS[11].price,
      },
    ],
    totalAmount: MOCK_PRODUCTS[2].price + MOCK_PRODUCTS[11].price,
    status: 'PENDING',
    shippingAddress: '789 Pine Road, Seattle, WA 98101',
    createdAt: '2025-04-08T16:00:00Z',
    updatedAt: '2025-04-08T16:00:00Z',
  },
];

export function buildProductPage(
  products: Product[],
  page: number,
  size: number,
  categoryId?: string | null,
  search?: string | null
): ProductPage {
  let filtered = products;
  if (categoryId) {
    filtered = filtered.filter((p) => p.category.id === categoryId);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(q) || (p.description ?? '').toLowerCase().includes(q)
    );
  }
  const start = page * size;
  return {
    content: filtered.slice(start, start + size),
    totalElements: filtered.length,
    totalPages: Math.ceil(filtered.length / size),
    page,
    size,
  };
}
