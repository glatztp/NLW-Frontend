import { ArrowLeft, Radio } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { QuestionForm } from "@/components/question-form";
import { QuestionList } from "@/components/question-list";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type RoomParams = {
  roomId: string;
};

export function Room() {
  const params = useParams<RoomParams>();

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white selection:bg-khaki selection:text-black">
      <div className="pointer-events-none absolute inset-0 -z-10 animate-pulse-slow bg-[radial-gradient(ellipse_at_center,_#4b3f2f33,_transparent)] opacity-30 backdrop-blur-sm" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/create-room">
            <Button
              variant="outline"
              className="border-white/20 text-almond hover:bg-white/10 backdrop-blur-md focus-visible:ring-2 focus-visible:ring-khaki transition"
            >
              <ArrowLeft className="mr-2 size-5" />
              Voltar ao Início
            </Button>
          </Link>

          <Link to={`/room/${params.roomId}/audio`}>
            <Button
              variant={"ghost"}
              className="backdrop-blur-lg text-white shadow-md focus-visible:ring-2 focus-visible:ring-yellow-400 transition"
            >
              <Radio className="size-5 mr-2" />
              Gravar Áudio
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 rounded-3xl  backdrop-blur-lg border border-white/20 p-8 shadow-2xl"
        >
          <QuestionForm roomId={params.roomId} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-3xl  backdrop-blur-lg border border-white/20 p-6 shadow-2xl"
        >
          <QuestionList roomId={params.roomId} />
        </motion.div>
      </div>
    </div>
  );
}
