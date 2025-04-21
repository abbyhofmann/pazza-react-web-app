import { Enrollment } from "./../../../types.tsx";
import api from "./api.ts";

// we are using VITE, so import.meta.env is used instead of process.env for importing environment variables
const ENROLLMENTS_API_URL = `${import.meta.env.VITE_API_URL}/enrollments`;

// get enrollments for a course
const getEnrollments = async (cid: string): Promise<Enrollment[]> => {
  const res = await api.get(`${ENROLLMENTS_API_URL}/${cid}`);

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};


// get number of student enrollments for a course
const getStudentEnrollmentsCount = async (cid: string): Promise<number> => {
  const res = await api.get(
    `${ENROLLMENTS_API_URL}/countStudentEnrollments/${cid}`
  );

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export { getEnrollments, getStudentEnrollmentsCount };