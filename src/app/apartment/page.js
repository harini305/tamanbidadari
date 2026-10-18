import RoomPage, { roomMetadata } from "@/components/RoomPage";

export const metadata = roomMetadata("apartment");

export default function Page() {
  return <RoomPage slug="apartment" />;
}
