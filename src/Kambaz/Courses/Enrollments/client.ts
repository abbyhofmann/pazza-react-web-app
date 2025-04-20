import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enroll = async (courseId: string) => {
  const response = await axiosWithCredentials.put(`${ENROLLMENTS_API}/${courseId}`);
  return response.data;
};

export const unenroll = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${courseId}`);
  return data;
};
