"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  async function getHello() {
    try {
      const res = await fetch(
        "https://1m-client-git-master-egor-belousovs-projects.vercel.app/"
      );
      // const res = await fetch("http://localhost:5000/");
      console.log("res:", res);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getHello();
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>Hellow world!</main>
    </div>
  );
}
