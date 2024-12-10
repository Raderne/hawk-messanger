import { ChannelList } from "stream-chat-expo";
import { router } from "expo-router";
import { useAuth } from "@/providers/authProvider";

export default function MainTabScreen() {
  const { user } = useAuth();

  return (
    <ChannelList
      filters={{ members: { $in: user ? [user.id] : [] } }}
      onSelect={(channel) => router.push(`/(home)/channel/${channel.cid}`)}
    />
  );
}
