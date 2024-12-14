import { View, Text } from 'react-native'
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;
if (!apiKey) {
  throw new Error("API key is missing");
}
const userId = "0734c1fb-9004-446c-8cf5-467e608f6fd4";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDczNGMxZmItOTAwNC00NDZjLThjZjUtNDY3ZTYwOGY2ZmQ0In0.OXC07goJQajiBaSN1hUV0AXAEcRfMeYfVwRIGdplfYE";
const callId = "my-call-id";
const user: User = { id: userId };

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

export default function CallScreen() {
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}