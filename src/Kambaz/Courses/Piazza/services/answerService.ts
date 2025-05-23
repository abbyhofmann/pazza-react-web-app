import { Answer } from "../../../types.tsx";
import api from "./api.ts";

const ANSWER_API_URL = `${import.meta.env.VITE_API_URL}/answer`;

/**
 * Gets an answer by its ID.
 *
 * @param aid The ID of the answer to fetch.
 * @throws Error if there is an issue fetching the answer by ID.
 */
const getAnswerById = async (aid: string): Promise<Answer> => {
  const res = await api.get(`${ANSWER_API_URL}/${aid}`);
  if (res.status !== 200) {
    throw new Error("Error while fetching answer");
  }
  return res.data;
};

/**
 * Updates an answer upon a user editing its content.
 *
 * @param aid The id of the answer being updated.
 * @param newContent The updated content of the answer.
 * @returns The updated answer object.
 */
const updateAnswer = async (
  aid: string,
  newContent: string
): Promise<Answer> => {
  const data = { aid, newContent };
  const res = await api.put(`${ANSWER_API_URL}/updateAnswer`, data);

  if (res.status !== 200) {
    throw new Error("Error while updating answer");
  }
  return res.data;
};

/**
 * Adds a new answer to the database.
 *
 * @param newAnswer The new answer object being created.
 * @returns The new answer object.
 */
const createAnswer = async (newAnswer: Answer): Promise<Answer> => {
  const res = await api.post(`${ANSWER_API_URL}/createAnswer`, newAnswer);

  if (res.status !== 200) {
    throw new Error("Error while creating answer");
  }
  return res.data;
};

/**
 * Deletes an answer.
 * @param aid The id of the answer to delete.
 * @returns boolean indicating the success of the deletion.
 */
const deleteAnswer = async (aid: string): Promise<boolean> => {
  const res = await api.delete(`${ANSWER_API_URL}/${aid}`);

  if (res.status !== 200) {
    throw new Error("Error while deleting answer");
  }
  return res.data;
};

/**
 * Gets an the instructor and student answer counts for course. Returns an array of [studentResponseCount, instructorResponseCount].
 *
 * @param cid The ID of the course for which the number of answers is being fetched.
 * @throws Error if there is an issue fetching the answers by course ID.
 */
const getResponseCounts = async (cid: string): Promise<Number[]> => {
  const res = await api.get(`${ANSWER_API_URL}/responseCounts/${cid}`);
  
  if (res.status !== 200) {
    throw new Error("Error while fetching response counts");
  }
  return res.data;
};

export { getAnswerById, updateAnswer, createAnswer, deleteAnswer, getResponseCounts };
