import qs from "qs";
import type { ApiResponseBody } from "../api/transferInterivew";

export const extractApiAttribues = <T>(responseBody: ApiResponseBody<T>) =>
  responseBody.data.map((d) => d.attributes);

export async function fetcher<T>(
  callback: (queryString?: string, ...args: any[]) => Promise<Response>,
  query?: { [name: string]: any }
) {
  const queryString = qs.stringify(query) ?? "";
  const resp = await callback(queryString);
  if (!resp.ok) {
    throw new Error(resp.statusText);
  }

  // console.log(await resp.text());
  return resp.json() as T;
}
