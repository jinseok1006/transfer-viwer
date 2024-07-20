import type { ApiResponse } from "../api/api";

export const extractApiAttribues = <T>(responseBody: ApiResponse<T>) =>
  responseBody.data.map((d) => d.attributes);
