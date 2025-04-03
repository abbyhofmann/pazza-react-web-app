/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enroll = async (courseId: string) => {
  const response = await axios.delete(`${ENROLLMENTS_API}/${courseId}`);
  return response.data;
};

export const unenroll = async (courseId: string) => {
  const { data } = await axios.put(`${ENROLLMENTS_API}/${courseId}`, courseId);
  return data;
};
