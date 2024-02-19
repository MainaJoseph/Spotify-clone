"use client";

import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";

import Button from "./Button";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const [gradientIndex, setGradientIndex] = useState(0);
  const player = usePlayer();
  const router = useRouter();
  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const gradients = [
    "bg-gradient-to-b from-emerald-800 to-green-600",
    "bg-gradient-to-b from-blue-500 to-purple-400",
    "bg-gradient-to-b from-yellow-700 to-amber-700",
    "bg-gradient-to-b from-rose-800 to-pink-600",
    "bg-gradient-to-b from-indigo-800 to-purple-600",
    "bg-gradient-to-b from-cyan-800 to-teal-600",
    "bg-gradient-to-b from-gray-800 to-gray-600",
    "bg-gradient-to-b from-red-800 to-red-600",
    "bg-gradient-to-b from-fuchsia-800 to-purple-600",
    "bg-gradient-to-b from-lime-800 to-yellow-600",
    "bg-gradient-to-b from-cyan-800 to-blue-600",
    "bg-gradient-to-b from-pink-800 to-rose-600",
  ]; // Add more gradients as needed

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prevIndex) => (prevIndex + 1) % gradients.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [gradients.length]);

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged Out!");
    }
  };

  return (
    <div
      className={twMerge(
        `
        h-fit 
        ${gradients[gradientIndex]} // Apply dynamic gradient
        p-6
        transition-all duration-1000 
        `,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={() => router.push("/")}
            className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            onClick={() => router.push("/search")}
            className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="
                    bg-transparent 
                    text-neutral-300 
                    font-medium
                  "
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-white px-6 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
