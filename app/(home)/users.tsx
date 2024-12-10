import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Stack } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/authProvider";
import UserListItem from "@/components/UserListItem";

export default function UsersScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user?.id);

      if (error) console.error("error", error);

      setUsers(profiles ?? []);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "My Contacts",
          headerTitleAlign: "center",
        }}
      />
      <FlatList
        data={users}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <UserListItem user={item} />}
      />
    </>
  );
}
