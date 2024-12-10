import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { useAuth } from "./authProvider";
import { Redirect } from "expo-router";
import { supabase } from "@/lib/supabase";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;
if (!apiKey) {
  throw new Error("Missing Stream API key");
}

const client = StreamChat.getInstance(apiKey);

export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    if (!profile) {
      return;
    }

    const connect = async () => {
      await client.connectUser(
        {
          id: profile.id,
          name: profile.full_name,
          image: supabase.storage
            .from("avatars")
            .getPublicUrl(profile.avatar_url).data.publicUrl,
        },
        client.devToken(profile.id)
      );

      // /**
      //  *  Channel created using a channel id
      //  */
      // const channel = client.channel("messaging", "the_test", {
      //   name: "The Test",
      // });
      // await channel.watch();

      setIsReady(true);
    };

    connect();

    return () => {
      if (isReady) {
        client.disconnectUser();
      }
      setIsReady(false);
    };
  }, [profile?.id]);

  // if (!isReady) {
  //   return <ActivityIndicator />;
  // }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
}
