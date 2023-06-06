const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/HomePage.vue") }],
    meta: {
      needsNoAdmin: true,
    },
  },
  {
    path: "/profile",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ProfilePage.vue") }],
    meta: {
      needsNoAdmin: true,
    },
  },
  {
    path: "/inspiration",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/InspirationPage.vue") },
    ],
    meta: {
      needsNoAdmin: true,
    },
  },
  {
    path: "/shopping",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ShoppingPage.vue") }],
    meta: {
      needsNoAdmin: true,
    },
  },
  {
    path: "/insights",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/InsightsPage.vue") }],
    meta: {
      needsNoAdmin: true,
    },
  },
  {
    path: "/fidelity",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/FidelityPage.vue") }],
    meta: {
      needsNoAdmin: true,
    },
  },
  {
    path: "/shopping/:shoppingListId",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/ManageShoppingListPage.vue") },
    ],
    meta: {
      needsNoAdmin: true,
    },
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
    meta: {
      needsNoAdmin: true,
    },
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
