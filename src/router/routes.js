const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/HomePage.vue") }],
  },
  {
    path: "/login",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/authentication/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/signup",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/authentication/SignupPage.vue"),
      },
    ],
  },
  {
    path: "/forgotPassword",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/authentication/ForgotPasswordPage.vue"),
      },
    ],
  },
  {
    path: "/profile",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ProfilePage.vue") }],
  },
  {
    path: "/inspiration",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/InspirationPage.vue") },
    ],
  },
  {
    path: "/shopping",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ShoppingPage.vue") }],
  },
  {
    path: "/insights",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/InsightsPage.vue") }],
  },
  {
    path: "/shopping/:shoppingListId",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/ManageShoppingListPage.vue") },
    ],
  },
  {
    path: "/shopping/:categoryId",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/CategorisedProductsPage.vue"),
      },
    ],
  },
  {
    path: "/administration",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/administration/AdminHomePage.vue"),
      },
    ],
    meta: {
      needsAdmin: true,
    },
  },
  {
    path: "/administration/markets",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/administration/MarketsPage.vue"),
      },
    ],
    meta: {
      needsAdmin: true,
    },
  },
  {
    path: "/administration/markets/:marketId",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("src/pages/administration/MarketDetailsPage.vue"),
      },
    ],
    meta: {
      needsAdmin: true,
    },
  },
  {
    path: "/administration/markets/:marketId/:locationId",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/administration/LocationDetailsPage.vue"),
      },
    ],
    meta: {
      needsAdmin: true,
    },
  },
  {
    path: "/administration/markets/:marketId/:locationId/:categoryId",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        component: () =>
          import("pages/administration/CategorisedProductsPage.vue"),
      },
    ],
    meta: {
      needsAdmin: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFoundPage.vue"),
  },
];

export default routes;
