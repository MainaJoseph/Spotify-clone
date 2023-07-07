import React, { useEffect, useState, useRef } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward, AiOutlineSync, AiOutlineBars, AiOutlinePlaySquare } from "react-icons/ai";
import { FaRandom } from "react-icons/fa";
import { GiMicrophone } from "react-icons/gi";
import useSound from "use-sound";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";
import ReactTooltip from "react-tooltip";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false); // State variable for shuffle icon
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const isSpacePressedRef = useRef(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    let nextSong;

    if (isShuffling) {
      const randomIndex = Math.floor(Math.random() * player.ids.length);
      nextSong = player.ids[randomIndex];
    } else {
      const currentIndex = player.ids.findIndex((id) => id === player.activeId);
      nextSong = player.ids[currentIndex + 1];

      if (!nextSong) {
        return player.setId(player.ids[0]);
      }
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      if (!isLooping) {
        onPlayNext();
      }
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  useEffect(() => {
    if (isLooping && sound) {
      sound.loop(true);
    }
  }, [isLooping, sound]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && !isSpacePressedRef.current) {
        setIsSpacePressed(true);
        isSpacePressedRef.current = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setIsSpacePressed(false);
        isSpacePressedRef.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handlePlay = () => {
    if (!isPlaying && !isSpacePressed) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const handleLoop = () => {
    setIsLooping(!isLooping);
  };

  const handleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={24} className="text-black" />
        </div>
      </div>

      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <div
          onClick={handleShuffle}
          className="text-neutral-400 cursor-pointer hover:text-green-500 transition"
        >
          <FaRandom size={24} className={isShuffling ? "text-green-500" : ""} />
        </div>
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={24}
          className="text-neutral-400 cursor-pointer hover:text-green-500 transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={24} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={24}
          className="text-neutral-400 cursor-pointer hover:text-green-500 transition"
        />
        <AiOutlineSync
          onClick={handleLoop}
          size={24}
          className={`text-neutral-400 cursor-pointer hover:text-green-500 ${
            isLooping ? "animate-spin text-green-500" : ""
          }`}
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[180px]">
          <AiOutlinePlaySquare
            size={50}
            className={`text-neutral-400 cursor-pointer hover:text-green-600`}
          />

          <GiMicrophone
            size={50}
            className={`text-neutral-400 cursor-pointer hover:text-green-600`}
            title="Lyrics"
          />

          <AiOutlineBars
            size={50}
            className={`text-neutral-400 cursor-pointer hover:text-green-600`}
          />
          <VolumeIcon onClick={toggleMute} className="cursor-pointer" size={28} />

          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
