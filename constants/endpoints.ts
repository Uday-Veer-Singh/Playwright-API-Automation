export const endpoints = {
  auth: {
    login: "/auth/login",
    me: "/auth/me",
  },

  products: {
    add: "/products/add",
    getById: (id: number) => `/products/${id}`,
    updateById: (id: number) => `/products/${id}`,
    deleteById: (id: number) => `/products/${id}`,
  },
};
