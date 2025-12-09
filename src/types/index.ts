export interface EventType {
  id: number;
  name: string;
  slug: string;
  duration_minutes: number;
  is_active: boolean;
  location_type: string;
  location_value?: string;
}
export interface EventCardProps {
  event: EventType;
  onCopy: (slug: string) => void;
  onToggle: (id: number, currentStatus: boolean) => void;
}
export interface TimeSlot {
  start: string;
  end: string;
}
