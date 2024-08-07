import type { InterviewPost } from "../types";
import { fetcher } from "../utils/util";

// const API_SERVER_URL = import.meta.env.VITE_API_SERVER;

const API_SERVER_URL = "https://transfer-api.jins.page/api";

export interface ApiResponseBody<T> {
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

class TransferInterviewApi {
  getPostByDepartment(department: string) {
    return fetcher<ApiResponseBody<InterviewPost>>(
      (queryString) =>
        fetch(`${API_SERVER_URL}/interview-posts?${queryString}`),
      {
        filters: {
          department: {
            $eq: department,
          },
        },
      }
    );
  }

  getPostByDepartments(departments: string[]) {
    return fetcher<ApiResponseBody<InterviewPost>>(
      (queryString) =>
        fetch(`${API_SERVER_URL}/interview-posts?${queryString}`),
      {
         sort: "createdAt:desc",
        filters: {
          department: {
            $in: departments,
          },
        },
      }
    );
  }

  getNewestPosts() {
    return fetcher<ApiResponseBody<InterviewPost>>(
      (queryString) =>
        fetch(`${API_SERVER_URL}/interview-posts?${queryString}`),
      {
        sort: "createdAt:desc",
        pagenation: {
          page: 1,
          pageSize: 7,
        },
      }
    );
  }
  submitPost(payload: any) {
    return fetcher<ApiResponseBody<InterviewPost>>(() =>
      fetch(`${API_SERVER_URL}/interview-posts`, {
        body: JSON.stringify({ data: payload }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  }
}

export default new TransferInterviewApi();
