import { useState, useEffect } from "react";

interface CreateEventData {
  name: string;
  slug: string;
  duration_minutes: number;
}

export function useCreateEventForm(
  onSubmit: (data: CreateEventData) => Promise<boolean>,
  onClose: () => void
) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [duration, setDuration] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const generated = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generated);
  }, [name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await onSubmit({
      name,
      slug,
      duration_minutes: Number(duration),
    });

    setIsSubmitting(false);

    if (success) {
      setName("");
      setDuration(30);
      onClose();
    }
  };

  return {
    name,
    slug,
    duration,
    isSubmitting,
    setName,
    setSlug,
    setDuration,
    handleSubmit,
  };
}
