import { ChannelList } from "stream-chat-expo";
import { Link, Redirect, router, Stack } from "expo-router";
import { useAuth } from "@/providers/authProvider";
import { FontAwesome5 } from "@expo/vector-icons";

export default function MainTabScreen() {
  const { user } = useAuth();

  return (
    <>
      <Redirect href={"/(home)/call"} />
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href={"/(home)/users"} style={{ padding: 10 }} asChild>
              <FontAwesome5 name="users" size={22} color="gray" />
            </Link>
          ),
        }}
      />
      <ChannelList
        filters={{ members: { $in: user ? [user.id] : [] } }}
        onSelect={(channel) => router.push(`/(home)/channel/${channel.cid}`)}
      />
    </>
  );
}
