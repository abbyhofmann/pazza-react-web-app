import { User } from "../../../types.tsx";
import api from "./api.ts";

const USER_API_URL = `${import.meta.env.VITE_API_URL}/user`;

/**
 * Gets a user by their ID.
 *
 * @param uids The ID of the user to fetch.
 * @throws Error if there is an issue fetching the user by ID.
 */
const getUser = async (uid: string): Promise<User> => {
  const res = await api.get(`${USER_API_URL}/${uid}`);

  if (res.status !== 200) {
    throw new Error("Error while fetching user");
  }
  return res.data;
};

export { getUser };