import { useEffect } from "react";

/**
 * Custom hook to set the document title
 * @param {string} title - The page title to set
 */
export default function useTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
