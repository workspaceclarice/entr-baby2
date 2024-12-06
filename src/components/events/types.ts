export interface GuestListProps {
  attendeeCount: number;
  isRSVP: boolean;
  guestList?: {
    going: number;
    maybe: number;
    notGoing: number;
  };
} 