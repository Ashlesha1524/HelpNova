import { cookies } from "next/headers";

export async function getSession(){
    const session=await cookies()
    const token=session.get("access_token")?.value
    console.log(token)

}