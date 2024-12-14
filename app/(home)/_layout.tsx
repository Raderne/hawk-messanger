import { useAuth } from "@/providers/authProvider";
import ChatProvider from "@/providers/chatProvider";
import { Redirect, Stack } from "expo-router";

export default function HomeLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href={"/(auth)/login"} />;
  }

  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen name="/(home)/call" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ChatProvider>
  );
}
