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
  DENTIST: {
    HOME: "/appointments",
    APPOINTMENT: {
      VIEW: "/appointments",
      CREATE: "/appointments/create",
    },
  },
};

export const BASENAME = "/dental-booking-app";

export default routes;
