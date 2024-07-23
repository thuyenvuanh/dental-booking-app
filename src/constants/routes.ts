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
  ADMINISTRATOR: {
    HOME: "/dentist",
    DENTIST: {
      VIEW: "/dentist",
      NEW: "/dentist/create",
      EDIT: "/dentist/edit",
    },
    CLINIC: {
      VIEW: "/clinic",
      NEW: "/clinic/create",
      EDIT: "/clinic/edit",
    },
  },
};

export const BASENAME = "/dental-booking-app";

export default routes;
