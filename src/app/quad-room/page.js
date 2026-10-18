import RoomPage, { roomMetadata } from "@/components/RoomPage";

export const metadata = roomMetadata("quad-room");

export default function Page() {
  return <RoomPage slug="quad-room" />;
}
