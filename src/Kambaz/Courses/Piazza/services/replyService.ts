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

export { getReplyById };
