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

/**
 * Adds a new followup discussion to the database.
 * @param newDiscussion The new discussion object to add.
 * @returns The new discussion object added to the database.
 */
const createDiscussion = async (
  newDiscussion: FollowupDiscussion
): Promise<FollowupDiscussion> => {
  const res = await api.post(
    `${FOLLOWUP_DISCUSSION_API_URL}/createDiscussion`,
    newDiscussion
  );

  if (res.status !== 200) {
    throw new Error("Error while creating followup discussion");
  }
  return res.data;
};

/**
 * Adds a reply id to a followup discussion's list of replies.
 *
 * @param fudId The id of the discussion to which the reply is being added.
 * @param rid The id of the reply being added.
 * @returns The updated followup discussion object with the reply id added.
 */
const addReplyToDiscussion = async (
  fudId: string,
  rid: string
): Promise<FollowupDiscussion> => {
  const data = { fudId, rid };
  const res = await api.put(`${FOLLOWUP_DISCUSSION_API_URL}/addReply`, data);

  if (res.status !== 200) {
    throw new Error(`Error while adding reply to discussion`);
  }
  return res.data;
};

/**
 * Marks a followup discussion as resolved.
 *
 * @param fudId The id of the discussion being resolved.
 * @returns The updated followup discussion object now marked as resolved.
 */
const markDiscussionResolved = async (
  fudId: string
): Promise<FollowupDiscussion> => {
  const data = { fudId };
  const res = await api.put(
    `${FOLLOWUP_DISCUSSION_API_URL}/markResolved`,
    data
  );

  if (res.status !== 200) {
    throw new Error(`Error while marking discussion as resolved`);
  }
  return res.data;
};

/**
 * Marks a followup discussion as unresolved.
 *
 * @param fudId The id of the discussion being unresolved.
 * @returns The updated followup discussion object now marked as unresolved.
 */
const markDiscussionUnresolved = async (
  fudId: string
): Promise<FollowupDiscussion> => {
  const data = { fudId };
  const res = await api.put(
    `${FOLLOWUP_DISCUSSION_API_URL}/markUnresolved`,
    data
  );

  if (res.status !== 200) {
    throw new Error(`Error while marking discussion as unresolved`);
  }
  return res.data;
};

/**
 * Deletes a followup discussion.
 * @param fudId The id of the followup discussion to delete.
 * @returns boolean indicating the success of the deletion.
 */
const deleteFollowupDiscussion = async (fudId: string): Promise<boolean> => {
  const res = await api.delete(`${FOLLOWUP_DISCUSSION_API_URL}/${fudId}`);

  if (res.status !== 200) {
    throw new Error("Error while deleting followup discussion");
  }
  return res.data;
};

/**
 * Updates a followup discussion upon a user editing its content.
 *
 * @param fudId The id of the fud being updated.
 * @param newContent The updated content of the fud.
 * @returns The updated fud object.
 */
const updateFud = async (
  fudId: string,
  newContent: string
): Promise<FollowupDiscussion> => {
  const data = { fudId, newContent };
  const res = await api.put(`${FOLLOWUP_DISCUSSION_API_URL}/updateFud`, data);

  if (res.status !== 200) {
    throw new Error("Error while updating fud");
  }
  return res.data;
};

/**
 * Removes a reply from a followup discussion's array of reply ids.
 * @param fudId The id of the followup discussion from which to remove the reply.
 * @param replyId The id of the reoly to remove.
 * @returns The updated followup discussion object with the reply id removed from the array.
 */
const removeReplyFromFud = async (fudId: string, replyId: string): Promise<FollowupDiscussion> => {
  const data = { fudId, replyId }; 
  const res = await api.put(`${FOLLOWUP_DISCUSSION_API_URL}/removeReply`, data);

  if (res.status !== 200) {
    throw new Error("Error while removing reply from fud");
  }
  return res.data;
}

export {
  getFollowupDiscussionById,
  createDiscussion,
  addReplyToDiscussion,
  markDiscussionResolved,
  markDiscussionUnresolved,
  deleteFollowupDiscussion,
  updateFud,
  removeReplyFromFud
};
