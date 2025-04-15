import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Post } from "../../../types";
import { usePostSidebarContext } from "../hooks/usePostSidebarContext";

const usePostSidebar = () => {
  const navigate = useNavigate();
  const { cid } = useParams();

  const { posts, fetchPosts } = usePostSidebarContext();

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const navButton = () => {
    navigate(`/Kambaz/Courses/${cid}/Piazza/NewPostPage`);
  };

  useEffect(() => {
    fetchPosts().catch(e => console.log(e));
  }, []);

  function isUnanswered(post: Post): boolean {
    return post.studentAnswer === null && post.instructorAnswer === null && post.type === 0;
  }

  function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = String(date.getUTCFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  }

  function extractTime(dateString: string): string {
    const date = new Date(dateString);
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  function getDayOfWeek(dateString: string): string {
    const date = new Date(dateString);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getUTCDay()];
  }

  function getTodaysDate(): string {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = String(today.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  }

  function getYesterdayDate(): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    const year = String(yesterday.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  }

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

  function groupPostsByWeek(datesToExclude: string[], posts: Post[]): Map<string, Post[]> {
    const groupedPosts: Map<string, Post[]> = new Map();

    if (!Array.isArray(posts)) {
      console.error("Expected posts to be an array but got:", posts);
      return groupedPosts;
    }

    posts.forEach((post) => {
      if (!datesToExclude.includes(formatDate(post.datePosted))) {
        const postDate = new Date(post.datePosted);
        const monday = new Date(postDate);
        monday.setUTCDate(postDate.getUTCDate() - postDate.getUTCDay() + 1);
        monday.setUTCHours(0, 0, 0, 0);

        const sunday = new Date(monday);
        sunday.setUTCDate(monday.getUTCDate() + 6);

        const weekRange = `${monday.getUTCMonth() + 1}/${monday.getUTCDate()} - ${sunday.getUTCMonth() + 1}/${sunday.getUTCDate()}`;

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
  const groupedPostsMap = Array.isArray(posts)
    ? groupPostsByWeek(thisWeekDates, posts)
    : new Map();

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
    yesterday,
    isUnanswered,
    navButton,
    posts,
  };
};

export default usePostSidebar;