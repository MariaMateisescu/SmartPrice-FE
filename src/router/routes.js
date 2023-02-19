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
    path: "/products",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ProductsPage.vue") }],
  },
  {
    path: "/administration/markets",
    component: () => import("layouts/MainLayout.vue"),
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
    component: () => import("layouts/MainLayout.vue"),
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
    component: () => import("layouts/MainLayout.vue"),
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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFoundPage.vue"),
  },
];

export default routes;
