import { FollowupDiscussion } from "../../../types.tsx";
import api from "./api.ts";

const FOLLOWUP_DISCUSSION_API_URL = `${
  import.meta.env.VITE_API_URL
}/followupDiscussion`;

/**
 * Gets a followup discussion by its ID.
 *
 * @param fudid The ID of the followup discussion to fetch.
 * @throws Error if there is an issue fetching the followup discussion by ID.
 */
const getFollowupDiscussionById = async (
  fudid: string
): Promise<FollowupDiscussion> => {
  const res = await api.get(`${FOLLOWUP_DISCUSSION_API_URL}/${fudid}`);

  if (res.status !== 200) {
    throw new Error("Error while fetching followup discussion");
  }
  return res.data;
};

export { getFollowupDiscussionById };
