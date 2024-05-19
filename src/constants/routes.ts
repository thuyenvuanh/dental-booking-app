const routes = {
  LOGIN: "/login",
  GUEST: {
    HOME: "/",
  },
  USER: {
    HOME: "/apmt",
    APPOINTMENT: {
      VIEW: "/apmt",
      CREATE: "/apmt/create",
    },
  },
};

export default routes;
