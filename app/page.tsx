import Image from "next/image";
import HomeClient from "./components/HomeClient";
import { getSession } from "./lib/getSession";

export default async function Home() {
  await getSession()
  return (
  <>
  <HomeClient/>
  </>
  );
}

