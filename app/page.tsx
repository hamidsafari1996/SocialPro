import React from "react";
import Story from "../components/Main/story";
import Post from "../components/Main/box-shop";
export default function Home() {
  return (
    <div className="flex justify-start flex-col">
      <Story />
      <Post/>
    </div>
  );
}
