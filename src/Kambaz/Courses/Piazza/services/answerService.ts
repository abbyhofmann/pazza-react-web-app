import { Answer } from "../../../types.tsx";
import api from "./api.ts";

const STUDENT_ANSWER_API_URL = `${process.env.DB_CONN_STRING}/answer`;

/**
 * Gets an answer by its ID.
 *
 * @param aid The ID of the answer to fetch.
 * @throws Error if there is an issue fetching the answer by ID.
 */
const getAnswerById = async (aid: string): Promise<Answer> => {
  const res = await api.get(`${STUDENT_ANSWER_API_URL}/getAnswer/${aid}`);

  if (res.status !== 200) {
    throw new Error('Error while fetching answer');
  }
  return res.data;
};



export { getAnswerById };
