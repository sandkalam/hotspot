import { useState, useEffect, useRef } from "react";

import ClockAnim from "./components/ClockAnim";
import bgmusic from "./assets/bg.mp3";
export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className=" relative w-full flex justify-center items-center content-center min-h-screen bg-[rgba(255,241,178,.8)] overflow-hidden">
      <img
        src="./frame.webp"
        className="absolute w-full h-full object-cover select-none pointer-events-none top-0 left-0 z-10 transform scale-[1.1] transition-all duration-300 filter hover:drop-shadow-[0_2px_10px_rgba(0,0,2,0.5)]"
      />
      <div className="absolute top-17 right-19 z-20 flex gap-5 p-2">
        <PlayButton />
      </div>

      <div className="relative w-full max-w-6xl aspect-video shadow-2xl overflow-hidden filter drop-shadow-[0_2px_10px_rgba(0,0,2,0.2)] transition-all duration-300">
        <img
          src="./bg.png"
          className="w-full h-full object-cover select-none pointer-events-none"
        />

        <div className="inset-0 absolute w-full h-full">
          {dataItem.map((item) => (
            <div
              key={item.id}
              className="absolute"
              style={item.style}
              onClick={() => {
                if (item.actions === "modal") {
                  setSelectedItem(item);
                }
              }}
            >
              <img
                src={item.path}
                className={
                  "absolute w-full h-full object-cover cursor-pointer transition-all duration-300 transform hover:drop-shadow-[0_2px_10px_rgba(255,215,0,0.8)] select-none" +
                  (item.className ? ` ${item.className}` : "")
                }
                draggable={false}
              />
            </div>
          ))}

          {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />}
          <ClockAnim />
        </div>
      </div>
    </div>
  );
}

function Modal({ item, onClose }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "Enter") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.3)] transition-opacity duration-300">
      <div className="relative p-6 rounded shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto transition-all duration-300 bg-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[rgba(255,255,255,0.2)]">
        <h2 className="text-xl font-bold mb-4">{item.title}</h2>
        <p>{item.content}</p>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <button */}
          {/*   onClick={onClose} */}
          {/*   className="absolute top-1 right-1 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 filter drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-300" */}
          {/* > */}
          {/*   X */}
          {/* </button> */}
          <div
            onClick={onClose}
            className="absolute top-1 right-1 px-2 py-1 scale-[0.7] cursor-pointer"
          >
            <img src="./exitbtn.png" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

const PlayButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Buat Audio sekali saja saat mount
  useEffect(() => {
    const audio = new Audio(bgmusic);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = ""; // lepas referensi agar bisa di-GC
    };
  }, []); // <-- hanya sekali

  // play/pause berdasarkan state
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="absolute" onClick={handleClick}>
      {isPlaying ? (
        <img src="./play.webp" alt="play" className="transform scale-[5]"></img>
      ) : (
        <img src="./pause.webp" alt="pause" className="transform scale-[5]"></img>
      )}
    </div>
  );
};

const dataItem = [
  {
    id: "buku",
    title: "Blogs & Articles",
    path: "./buku.png",
    style: { bottom: "3%", left: "73%", width: "11%", height: "13%" },
    actions: "modal",
    content:
      "Ini adalah konten dari buku. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ini adalah konten dari buku. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ini adalah konten dari buku. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ini adalah konten dari buku. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ini adalah konten dari buku. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ini adalah konten dari buku. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ini adalah konten dari buku. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ini adalah konten dari buku. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ini adalah konten dari buku. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "fire",
    title: "Emergency",
    path: "./fire.png",
    style: { bottom: "27%", left: "22%", width: "5%", height: "14%" },
    actions: "modal",
    content: "Ini adalah konten dari fire extinguisher",
  },
  {
    id: "jam",
    title: "jam dinding",
    path: "./jam.png",
    style: { bottom: "82%", left: "28%", width: "4.5%", height: "11%" },
    actions: "modal",
    content: "Ini adalah konten dari jam dinding",
  },
  // {
  //   id: "papantulis",
  //   title: "papan tulis",
  //   path: "./papantulis.png",
  //   style: { bottom: "42.5%", left: "35%", width: "47.5%", height: "48.5%" },
  //   actions: "modal",
  //   content: "Ini adalah konten dari papan tulis",
  // },
  {
    id: "poster1",
    title: "Tech Stack",
    path: "./poster1.png",
    style: { bottom: "52%", left: "0%", width: "5%", height: "22%" },
    actions: "modal",
    content: "Ini adalah konten dari poster 1",
  },
  {
    id: "poster2",
    title: "Skills",
    path: "./poster2.webp",
    style: { bottom: "49%", left: "7%", width: "9%", height: "25%" },
    actions: "modal",
    content: "Ini adalah konten dari poster 2",
  },
  {
    id: "speaker",
    title: "Announcements",
    path: "./speaker.webp",
    style: { bottom: "90%", left: "52%", width: "7%", height: "10%" },
    actions: "modal",
    content: "Ini adalah konten dari speaker",
  },
  {
    id: "surat1",
    title: "Contracts",
    path: "./surat1.png",
    style: { bottom: "49%", left: "25.5%", width: "3%", height: "9%" },
    actions: "modal",
    content: "Ini adalah konten dari surat 1",
  },
  {
    id: "surat2",
    title: "Certificates",
    path: "./surat2.png",
    style: { bottom: "53%", left: "26%", width: "6%", height: "20%" },
    actions: "modal",
    content: "Ini adalah konten dari surat 2",
  },
  {
    id: "tas",
    title: "Experiences",
    path: "./tas.png",
    style: { bottom: "5%", left: "46%", width: "25%", height: "22.5%" },
    actions: "modal",
    content: "Ini adalah konten dari tas",
  },
  {
    id: "frieren",
    title: "About Me",
    path: "./frieren.webp",
    style: { bottom: "-4.4%", left: "8.2%", width: "24%", height: "44%" },
    actions: "modal",
    content: "Ini adalah konten dari frieren",
  },
  {
    id: "laptop",
    title: "Projects",
    path: "./laptop.png",
    style: { bottom: "36%", left: "44%", width: "11%", height: "2%" },
    actions: "modal",
    content: "Ini adalah konten dari laptop",
  },
];
