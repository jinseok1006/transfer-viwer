const STATIC_API_URL = 'https://transfer-static.inging.app';

// export const getColleges = () => fetch(`${STATIC_API_URL}/colleges.json`);

export const getCollegeDivisions = () =>
  fetch(`${STATIC_API_URL}/college-divisions.json`);

export const getTransferStatistics = () =>
  fetch(`${STATIC_API_URL}/transfer-statistics.json`);
