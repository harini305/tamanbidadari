import RoomPage, { roomMetadata } from "@/components/RoomPage";

export const metadata = roomMetadata("family-2-bed-rooms");

export default function Page() {
  return <RoomPage slug="family-2-bed-rooms" />;
}
