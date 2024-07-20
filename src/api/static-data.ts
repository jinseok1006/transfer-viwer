import { DepartmentLink } from "../types";

// const STATIC_API_URL = 'https://transfer-static.inging.app';
const STATIC_API_URL = import.meta.env.VITE_STATIC_API_URL;

// export const getColleges = () => fetch(`${STATIC_API_URL}/colleges.json`);

export const getCollegeDivisions = () =>
  fetch(`${STATIC_API_URL}/college-divisions.json`);

export const getTransferStatistics = () =>
  fetch(`${STATIC_API_URL}/transfer-statistics.json`);

export const getDepartmentLinks = async ():Promise<DepartmentLink> => {
  const resp = await fetch(`${STATIC_API_URL}/department-links.json`);

  if (!resp.ok) {
    throw new Error(resp.statusText);
  }

  return resp.json();
};
