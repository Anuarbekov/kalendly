export interface AvailabilityRule {
  weekday: number; // 0-6 (0 = Monday, 6 = Sunday)
  start_time: string; // "HH:MM"
  end_time: string; // "HH:MM"
}

export interface EventType {
  id: number;
  name: string;
  slug: string;
  duration_minutes: number;
  is_active: boolean;
  location_type: string;
  location_value?: string;
  availability_rules?: AvailabilityRule[];
}
export interface EventCardProps {
  event: EventType;
  onCopy: (slug: string) => void;
  onToggle: (id: number, currentStatus: boolean) => void;
  onDelete: (id: number) => void;
}
export interface TimeSlot {
  start: string;
  end: string;
}

export interface AvailabilitySlot {
  start: string; // "HH:mm"
  end: string; // "HH:mm"
}

export interface DailyAvailability {
  date: string; // "yyyy-MM-dd"
  label: string; // Human readable label for UI
  weekday: number; // 0-6 (0 = Monday, 6 = Sunday) for mapping to backend
  isAvailable: boolean;
  slots: AvailabilitySlot[];
}
