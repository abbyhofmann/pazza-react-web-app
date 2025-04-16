import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { posts } from "../../../Database";

/**
 * Custom hook for managing post sidebar and date-related functionality.
 */
const usePostSidebar = () => {

  const navigate = useNavigate();
  const { cid } = useParams();

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  /**
 * Function for formatting the given date in dd/mm/yy format. This is used for formatting the date for
 * older posts and for comparing today's date with the date of a certain post.
 * @param inputDate ISODate string ("2025-02-16T01:00:00.000Z" format from mongodb).
 * @returns Date as a string in mm/dd/yy format.
 */
  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = String(date.getUTCFullYear()).slice(-2);

    return `${month}/${day}/${year}`;
  }

  /**
  * Function for extracting the time (such as 8:45 AM or 9:27 PM) from a given ISO date.
  * @param dateString ISODate string ("2025-02-16T01:00:00.000Z" format from mongodb).
  * @returns Human-readable string of the time of the given date.
  */
  function extractTime(dateString: string): string {
    const date = new Date(dateString);
    let hours = date.getHours(); // get local hours
    const minutes = String(date.getMinutes()).padStart(2, '0');  // get local minutes
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12 || 12; // Convert to 12-hour format (AM/PM)
  
    return `${hours}:${minutes} ${ampm}`;
  }

  /**
  * Function for extracting the day of the week from a given ISO date.
  * @param dateString ISODate string ("2025-02-16T01:00:00.000Z" format from mongodb).
  * @returns The day of the week corresponding to the given date.
  */
  function getDayOfWeek(dateString: string): string {
    const date = new Date(dateString);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return days[date.getUTCDay()];
  }

  /**
  * Function for calculating today's date.
  * @returns Today's date as a string in mm/dd/yy format.
  */
  function getTodaysDate(): string {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2);

    return `${month}/${day}/${year}`;
  }

  /**
  * Function for calculating yesterday's date.
  * @returns Yesterday's date as a string in mm/dd/yy format.
  */
  function getYesterdayDate(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    const year = String(yesterday.getFullYear()).slice(-2);

    return `${month}/${day}/${year}`;
  }


  /**
  * Function for producing a list of strings of the days this past week (not including today or yesterday).
  * @returns List of strings in mm/dd/yy format.
  */
  function getLastWeekDates(): string[] {
    const today = new Date();
    const days: string[] = [];

    for (let i = 2; i < 7; i++) {
      const dayLastWeek = new Date(today);
      dayLastWeek.setUTCDate(today.getUTCDate() - i);

      const month = String(dayLastWeek.getUTCMonth() + 1).padStart(2, '0');
      const day = String(dayLastWeek.getUTCDate()).padStart(2, '0');
      const year = String(dayLastWeek.getUTCFullYear()).slice(-2);

      days.push(`${month}/${day}/${year}`);
    }

    return days;
  }

  // TODO - once we have mongodb data types, posts will be of type Post[] instead of the json
  /**
  * Function for grouping posts by the week they were created in. This creates a mapping between string date range (such as 2/10-2/16) and
  * a list of the post objects that fall within that week. The current week is excluded from this mapping, as posts from this week will
  * already be displayed in the "today", "yesterday", or "last week" dropdowns of the posts sidebar.
  * @param datesToExclude A list of string dates to exclude from the date mapping creation.
  * @param posts The posts being grouped.
  * @returns A mapping of string date range to list of posts that fall in that date range.
  */
  function groupPostsByWeek(datesToExclude: String[], posts: { _id: string; folderId: string; authorId: string; datePosted: string; type: number; instructor: boolean; title: string; content: string; followUpQuestions: string; studentResponse: string; instructorResponse: string; viewers: string; courseId: string; }[]): Map<string, { _id: string; folderId: string; authorId: string; datePosted: string; type: number; instructor: boolean; title: string; content: string; followUpQuestions: string; studentResponse: string; instructorResponse: string; viewers: string; courseId: string; }[]> {
    // map to keep track of which week each post belongs in
    const groupedPosts: Map<string, { _id: string; folderId: string; authorId: string; datePosted: string; type: number; instructor: boolean; title: string; content: string; followUpQuestions: string; studentResponse: string; instructorResponse: string; viewers: string; courseId: string; }[]> = new Map();

    posts.forEach((post) => {
      // add post to the week if it is not in the dates to exclude - for our use case, we do not want to display posts from this week,
      // as they will already be displayed in other dropdowns
      if (!datesToExclude.includes(formatDate(post.datePosted))) {
        const postDate = new Date(post.datePosted);

        // get Monday of the post's week
        const monday = new Date(postDate);
        monday.setUTCDate(postDate.getUTCDate() - postDate.getUTCDay() + 1); // Move to Monday
        monday.setUTCHours(0, 0, 0, 0);

        // get Sunday of the post's week
        const sunday = new Date(monday);
        sunday.setUTCDate(monday.getUTCDate() + 6); // Move to Sunday

        // format the week range in mm/dd - mm/dd format for label
        const weekRange = `${monday.getUTCMonth() + 1}/${monday.getUTCDate()} - ${sunday.getUTCMonth() + 1}/${sunday.getUTCDate()}`;

        // initialize week in the map if not already existing
        if (!groupedPosts.has(weekRange)) {
          groupedPosts.set(weekRange, []);
        }
        groupedPosts.get(weekRange)!.push(post);
      }

    });
    return groupedPosts;
  }

  const today = getTodaysDate();
  const yesterday = getYesterdayDate();
  const datesLastWeek = getLastWeekDates();
  const thisWeekDates = datesLastWeek.concat(today, yesterday);
  const groupedPostsMap = groupPostsByWeek(thisWeekDates, posts);


  // navigate when a post is clicked
  const handlePostClick = (pid: string) => {
    setSelectedPostId(pid);
    navigate(`/Kambaz/Courses/${cid}/Piazza/post/${pid}`);
  };


  return {
    formatDate,
    extractTime,
    getDayOfWeek,
    handlePostClick,
    selectedPostId,
    datesLastWeek,
    groupedPostsMap,
    today,
    yesterday
  };
};

export default usePostSidebar;
