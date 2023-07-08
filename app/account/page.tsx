"use client"

import Header from "@/components/Header";
import AccountContent from "./components/AccountContent";
import { useUser } from "@/hooks/useUser";

const Account = () => {
  const { user } = useUser();
  const userEmail = user?.email;

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
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Account Settings
          </h1>
          {userEmail && (
            <p className="p-2">Email: <span className="text-green-500 font-semibold">{userEmail}</span> </p>
          )}
        </div>
      </Header>
      <AccountContent />
    </div>
  )
}

export default Account;
