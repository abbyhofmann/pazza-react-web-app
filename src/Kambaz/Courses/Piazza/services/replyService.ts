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

/**
 * Deletes a reply.
 * @param aid The id of the reply to delete.
 * @returns boolean indicating the success of the deletion.
 */
const deleteReply = async (rid: string): Promise<boolean> => {
  const res = await api.delete(`${REPLY_API_URL}/${rid}`);

  if (res.status !== 200) {
    throw new Error("Error while deleting reply");
  }
  return res.data;
};

/**
 * Updates a reply upon a user editing its content.
 *
 * @param rid The id of the reply being updated.
 * @param newContent The updated content of the answer.
 * @returns The updated answer object.
 */
const updateReply = async (rid: string, newContent: string): Promise<Reply> => {
  const data = { rid, newContent };
  const res = await api.put(`${REPLY_API_URL}/updateReply`, data);

  if (res.status !== 200) {
    throw new Error("Error while updating reply");
  }
  return res.data;
};

export { getReplyById, createReply, deleteReply, updateReply };
