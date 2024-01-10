const API_SERVER_URL = import.meta.env.VITE_API_SERVER;

export const fetchInterviewPost = (divisionName: string) =>
  fetch(`${API_SERVER_URL}/transfer?division=${divisionName}`);

export const fetchNewestInterviewPosts = () =>
  fetch(`${API_SERVER_URL}/transfer/newest`);

export const submitInterviewPost = (payload: URLSearchParams) =>
  fetch(`${API_SERVER_URL}/transfer`, {
    method: 'post',
    body: payload,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
