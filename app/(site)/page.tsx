import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import { AiOutlinePlus } from "react-icons/ai";

import PageContent from "./components/PageContent";
import AiPlus from "@/components/AiPlus";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  const currentHour = new Date().getHours();
  let greeting = "";

  if (currentHour >= 0 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <div
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header>
        <div className="mb-2">
          <h1
            className="
            text-white 
              text-3xl 
              font-semibold
            "
          >
            <span>{greeting}</span>
          </h1>
          <div
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              xl:grid-cols-3 
              2xl:grid-cols-4 
              gap-3 
              mt-4
            "
          >
            <ListItem
              name="Liked Songs"
              image="/images/liked.png"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest songs</h1>
          <AiPlus songs={songs} />
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}
