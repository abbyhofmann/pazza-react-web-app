import { Reply } from "../../../types.tsx";
import api from "./api.ts";

const REPLY_API_URL = `${import.meta.env.VITE_API_URL}/reply`;

/**
 * Gets a reply by its ID.
 *
 * @param rid The ID of the reply to fetch.
 * @throws Error if there is an issue fetching the reply by ID.
 */
const getReplyById = async (rid: string): Promise<Reply> => {
  const res = await api.get(`${REPLY_API_URL}/${rid}`);

  if (res.status !== 200) {
    throw new Error("Error while fetching reply");
  }
  return res.data;
};

/**
 * Adds a new reply to the database.
 * @param newReply The new reply object to add.
 * @returns The new reply object added to the database.
 */
const createReply = async (newReply: Reply): Promise<Reply> => {
  const res = await api.post(`${REPLY_API_URL}/createReply`, newReply);

  if (res.status !== 200) {
    throw new Error("Error while creating reply");
  }
  return res.data;
};

export { getReplyById, createReply };