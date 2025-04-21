/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return data;
};

export const createAssignment = async (assignment: any) => {
  const { data } = await axios.post(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return data;
};

export const findAssignmentsForCourse = async (courseId: any) => {
  const { data } = await axios.get(`${ASSIGNMENTS_API}/${courseId}/course`);
  return data;
}

export const findAssignments = async () => {
  const { data } = await axios.get(`${ASSIGNMENTS_API}`);
  return data;
}