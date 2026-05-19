// Stub client — Base44 SDK removed. No runtime dependencies.
export const base44 = {
  auth: {
    me: () => Promise.reject(new Error('No auth provider')),
    logout: () => {},
    redirectToLogin: () => {},
  },
};
