"use client";

import { AiOutlinePlus } from "react-icons/ai";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { Song } from "@/types";

interface AiPlusProps {
  songs: Song[];
}

const AiPlus: React.FC<AiPlusProps> = ({ songs }) => {
  const { user, subscription } = useUser();
  const uploadModal = useUploadModal();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (songs.length >= 50) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div>
      <AiOutlinePlus
        onClick={onClick}
        size={20}
        className="text-neutral-400 cursor-pointer hover:text-white transition"
      />
    </div>
  );
};

export default AiPlus;
