export const config = {
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true',
  planningCenter: {
    appId: import.meta.env.VITE_PLANNING_CENTER_APP_ID,
    secret: import.meta.env.VITE_PLANNING_CENTER_SECRET,
  }
};