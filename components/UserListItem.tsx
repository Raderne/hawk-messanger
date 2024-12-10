import { View, Text, Pressable } from "react-native";
import React from "react";

interface User {
  full_name: string;
}

export default function UserListItem({ user }: { user: User }) {
  return (
    <Pressable style={{ padding: 15, backgroundColor: "white" }}>
      <Text style={{ fontWeight: "600", fontSize: 34 }}>{user.full_name}</Text>
    </Pressable>
  );
}
