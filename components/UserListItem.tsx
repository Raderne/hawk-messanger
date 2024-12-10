import { View, Text, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useChatContext } from "stream-chat-expo";
import { useAuth } from "@/providers/authProvider";
import { router } from "expo-router";

interface User {
  id: any;
  avatar_url: string;
  full_name: string;
}

export default function UserListItem({ user }: { user: User }) {
  const { client } = useChatContext();
  const { user: me } = useAuth();

  const onPress = async () => {
    const channel = client.channel("messaging", {
      members: [me?.id, user.id],
    });

    await channel.watch();
    router.replace(`/(home)/channel/${channel.cid}`);
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 15,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Image
        source={{
          uri: supabase.storage.from("avatars").getPublicUrl(user?.avatar_url)
            .data.publicUrl,
        }}
        style={{ width: 50, height: 50, borderRadius: 5 }}
      />
      <Text style={{ fontWeight: "600", fontSize: 34 }}>{user.full_name}</Text>
    </Pressable>
  );
}
