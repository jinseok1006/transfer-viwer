import qs from "qs";
import type { InterviewPost } from "../types";

// const API_SERVER_URL = import.meta.env.VITE_API_SERVER;
const API_SERVER_URL = "http://localhost:1337";

// export const fetchInterviewPost = (divisionName: string) =>
//   fetch(`${API_SERVER_URL}/transfer?division=${divisionName}`);

// export const fetchNewestInterviewPosts = () =>
//   fetch(`${API_SERVER_URL}/transfer/newest`);

// export const submitInterviewPost = (payload: URLSearchParams) =>
//   fetch(`${API_SERVER_URL}/transfer`, {
//     method: 'post',
//     body: payload,
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//   });

export interface ApiResponse<T> {
  data: ApiResponseData<T>[];
  meta: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
interface ApiResponseData<T> {
  id: number;
  attributes: T;
}

interface CoreFetchPrams {
  method: string;
  endpoint: string;
  query?: any;
  body?: any;
}

const coreFetch = async ({ method, endpoint, query, body }: CoreFetchPrams) => {
  const queryString = qs.stringify(query) ?? "";

  const resp = await fetch(`${API_SERVER_URL}/api/${endpoint}?${queryString}`, {
    method,
    body,
  });

  if (!resp.ok) {
    throw new Error(resp.statusText);
  }

  return resp.json();
};

const client = {
  get: (endpoint: string, query?: any) =>
    coreFetch({ method: "GET", endpoint, query }),
  post: (endpoint: string, query?: any, body?: any) =>
    coreFetch({ method: "POST", endpoint, query, body }),
};

export const fetchInterviewPostByDepartment = async (
  department: string
): Promise<ApiResponse<InterviewPost>> =>
  client.get('interview-posts', {
    filters: {
      department: {
        $eq: department,
      },
    },
  });

export const fetchInterviewPostByDepartments = async (departments: string[]):Promise<
ApiResponse<InterviewPost>
> =>
  client.get(`interview-posts`, {
    filters: {
      departments: {
        $in: departments,
      },
    },
  });

export const fetchNewestInterviewPosts = async (): Promise<
  ApiResponse<InterviewPost>
> =>
  client.get("interview-posts", {
    sort: "createdAt:desc",
    pagenation: {
      page: 1,
      pageSize: 7,
    },
  });

// export const fetchNewestInterviewPosts = async () => {};
export const submitInterviewPost = async (payload: any) => {};
export const fetchInterviewPost = async (divisionName: string) => {};
