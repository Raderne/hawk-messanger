import { supabase } from "@/lib/supabase";

export const TokenProvider = async () => {
  const { data, error } = await await supabase.functions.invoke("stream-token");

  return data.token;
};
