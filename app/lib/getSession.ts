import { cookies } from "next/headers";
import { scalekit } from "./scalekit";

export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload: any = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString()
    );

    const user = await scalekit.user.getUser(payload.sub);

    return user;
  } catch (error) {
    console.log("Session Error:", error);
    return null;
  }
}