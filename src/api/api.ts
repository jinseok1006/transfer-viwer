import axios from 'axios';
import type { InterviewPost } from '../components/InterviewPostCard';

const API_SERVER = import.meta.env.VITE_API_SERVER;

export const fetchInterviewPost = async (divisionName: string) =>
  (await axios.get(`${API_SERVER}/transfer?division=${divisionName}`))
    .data as InterviewPost[];

export const fetchNewestInterviewPosts = async () =>
  (await axios.get(`${API_SERVER}/transfer/newest`)).data as InterviewPost[];

export const submitInterviewPost = async (payload: URLSearchParams) =>
  axios.post(`${API_SERVER}/transfer`, payload);
