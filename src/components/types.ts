import type { EventType } from "../pages/Dashboard";


export interface EventCardProps {
  event: EventType;
  onCopy: (slug: string) => void;
  onToggle: (id: number, currentStatus: boolean) => void;
}