import { CreateRoomForm } from "@/components/create-room-form";
import { RoomList } from "@/components/room-list";
import { motion } from "framer-motion";
import { Sparkle } from "lucide-react";

export function CreateRoom() {
  if (typeof document !== "undefined") {
    document.documentElement.classList.add("dark");
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white selection:bg-khaki selection:text-black">
      <div className="pointer-events-none absolute inset-0 -z-10 animate-pulse-slow bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#4b3f2f33] via-transparent to-transparent opacity-30" />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center select-none"
        >
          <h1 className="text-4xl font-bold tracking-tight text-khaki drop-shadow-md">
            <span className="inline-flex items-center gap-2">
              <Sparkle size={32} className="text-khaki" />
              Crie uma nova sala
            </span>
          </h1>
          <p className="mt-3 text-lg text-gray-300 max-w-2xl mx-auto">
            Preencha os dados e veja as salas já criadas na lateral. Tudo em
            tempo real.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr] gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="rounded-2xl  backdrop-blur-md  shadow-lg flex flex-col"
          >
            <CreateRoomForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="rounded-2xl  backdrop-blur-md   shadow-lg overflow-auto max-h-[75vh]"
          >
            <RoomList />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
