import { getAuthSession } from "@/lib/auth";
import { LoggedInHeaderNav } from "./LoggedInHeaderNav";
import { LoggedOffHeaderNav } from "./LoggedOffHeaderNav";

export const AuthHeader = async () => {
  const session = await getAuthSession();

  if (!session) {
    return <LoggedOffHeaderNav />;
  }

  const { user } = session;

  return <LoggedInHeaderNav user={user} />;
};
