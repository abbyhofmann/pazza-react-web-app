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

const updateAnswer = async (aid: string, newContent: string): Promise<Answer> => {
  const res = await api.put(`${ANSWER_API_URL}/${aid}`, newContent);

  if (res.status !== 200) {
    throw new Error("Error while updating answer");
  }
  return res.data;
}

export { getAnswerById, updateAnswer };
