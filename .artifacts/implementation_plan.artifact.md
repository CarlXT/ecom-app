# Implementation Plan - E-commerce App Integration

This plan outlines the steps to transform the current visual prototype into a fully functional e-commerce application with a unified data model, admin authentication, and CRUD capabilities, as per the requested implementation build plan.

## User Review Required

> [!IMPORTANT]
> The project uses `htm` instead of JSX and loads dependencies via `importmap` (ESM). All new code must follow this pattern.
> We are using `Supabase` as the backend. The current `supabaseClient.js` has placeholder credentials that need to be updated with real ones for full functionality.

## Open Questions

- Should we use the existing `CartState.js` or move to a more unified `AppState.js`?
- For the "sample login allowed for assessment", should we hardcode a sample user in `AuthState.js` or use a dedicated Supabase user?

## Proposed Changes

### Shared Data Foundation

#### [MODIFY] [App.js](file:///C:/Users/gabriel/Downloads/ecom-app/src/App.js)
- Wrap the application with `CartProvider`, `AuthProvider`, and new `ProductProvider`, `OrderProvider`.
- Remove local cart state and use the context instead.

#### [MODIFY] [AuthState.js](file:///C:/Users/gabriel/Downloads/ecom-app/src/context/AuthState.js)
- Implement authentication state management (login, logout, isAdmin, session).

#### [NEW] [ProductState.js](file:///C:/Users/gabriel/Downloads/ecom-app/src/context/ProductState.js)
- Implement global product and category state management, fetching data from `productApi.js`.

#### [NEW] [OrderState.js](file:///C:/Users/gabriel/Downloads/ecom-app/src/context/OrderState.js)
- Implement global order state management, connecting to `orderApi.js`.

#### [MODIFY] [orderApi.js](file:///C:/Users/gabriel/Downloads/ecom-app/src/services/orderApi.js)
- Implement Supabase integration for orders and order items.

---

### Customer Storefront Core

#### [MODIFY] [HomePage.js](file:///C:/Users/gabriel/Downloads/ecom-app/src/pages/customer/HomePage.js)
- Connect to `ProductContext` to display featured products.

#### [MODIFY] [ShopPage.js](file:///C:/Users/gabriel/Downloads/ecom-app/src/pages/customer/ShopPage.js)
- Implement search, category filtering, and product grid connected to global state.

#### [MODIFY] [ProductDetailsPage.js](file:///C:/Users/gabriel/Downloads/ecom-app/src/pages/customer/ProductDetailsPage.js)
- Fetch and display product details, quantity selector, and "Add to Cart" functionality.

#### [MODIFY] [CheckoutPage.js](file:///C:/Users/gabriel/Downloads/ecom-app/src/pages/customer/CheckoutPage.js)
- Implement checkout form and order submission logic.

---

### Admin Auth and Protected Routes

#### [MODIFY] [LoginPage.js](file:///C:/Users/gabriel/Downloads/ecom-app/src/pages/admin/LoginPage.js)
- Implement admin login form connected to `AuthContext`.

#### [NEW] [ProtectedRoute.js](file:///C:/Users/gabriel/Downloads/ecom-app/src/components/admin/ProtectedRoute.js)
- Create a wrapper component to protect admin routes.

---

### Admin CRUD

#### [MODIFY] [ProductsPage.js](file:///C:/Users/gabriel/Downloads/ecom-app/src/pages/admin/ProductsPage.js)
- Implement Product CRUD (List, Add, Edit, Delete).

#### [NEW] [CategoriesPage.js](file:///C:/Users/gabriel/Downloads/ecom-app/src/pages/admin/CategoriesPage.js)
- Implement Category CRUD.

#### [MODIFY] [OrdersPage.js](file:///C:/Users/gabriel/Downloads/ecom-app/src/pages/admin/OrdersPage.js)
- Implement Order list and status updates.

#### [MODIFY] [CustomerPage.js](file:///C:/Users/gabriel/Downloads/ecom-app/src/pages/admin/CustomerPage.js)
- Implement Customer list and purchase statistics.

---

### Data Sync and Behavior Rules

- Ensure that updating a product status to "Inactive" or "Out of Stock" in the Admin panel correctly reflects in the Customer shop (hiding or showing badges).
- Verify that customer orders immediately appear in the Admin order management table.

## Verification Plan

### Automated Tests
- Since this is a browser-based ESM project without a traditional test runner set up, verification will be primarily manual through the UI.
- I will verify each CRUD operation and state transition.

### Manual Verification
1.  **Customer Flow**: Browse products -> Search/Filter -> Add to Cart -> Checkout -> Order Confirmation.
2.  **Admin Flow**: Login -> View Dashboard -> Manage Products/Categories -> Update Order Status.
3.  **Sync Test**: Change product price/stock in Admin -> Verify change in Shop.
