import { useCallback } from "react";
import toast from "react-hot-toast";

export function useEventActions() {
  const copyEventLink = useCallback((slug: string) => {
    const link = `${window.location.origin}/event/${slug}`;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy", err);
        toast.error("Failed to copy link");
      });
  }, []);

  return { copyEventLink };
}
