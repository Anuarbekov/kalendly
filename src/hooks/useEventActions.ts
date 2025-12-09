import { useCallback } from "react";

export function useEventActions() {
  const copyEventLink = useCallback((slug: string) => {
    const link = `${window.location.origin}/event/${slug}`;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy", err);
      });
  }, []);

  return { copyEventLink };
}
