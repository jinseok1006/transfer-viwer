import { DepartmentLink } from "../types";
import { fetcher } from "../utils/util";

const STATIC_API_URL = "https://transfer-parser.jins.page";
// const STATIC_API_URL = import.meta.env.VITE_STATIC_API_URL;

class StaticDataApi {
  getCollegeDivisions() {
    return fetcher<any>(() =>
      fetch(`${STATIC_API_URL}/college-divisions.json`)
    );
  }

  getTransferStatistics() {
    return fetcher<any>(() =>
      fetch(`${STATIC_API_URL}/transfer-statistics.json`)
    );
  }

  getDepartmentLinks() {
    return fetcher<DepartmentLink>(() =>
      fetch(`${STATIC_API_URL}/department-links.json`)
    );
  }
}
export default new StaticDataApi();

