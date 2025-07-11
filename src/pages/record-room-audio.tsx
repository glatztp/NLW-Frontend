import { useRef, useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

type RoomParams = {
  roomId: string;
};

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function RecordRoomAudio() {
  const params = useParams<RoomParams>();
  const navigate = useNavigate();

  const [isRecording, setIsRecording] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [clipsCount, setClipsCount] = useState(0);

  const recorder = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setSecondsElapsed((s) => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setSecondsElapsed(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  function stopRecording() {
    setIsRecording(false);
    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();
    formData.append("file", audio, "audio.webm");

    try {
      const response = await fetch(
        `http://localhost:3333/rooms/${params.roomId}/audio`,
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      console.log(result);
      setClipsCount((count) => count + 1);
    } catch (err) {
      console.error("Falha ao enviar áudio", err);
    }
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log("Gravação iniciada!");
    };

    recorder.current.onstop = () => {
      console.log("Gravação encerrada/pausada");
    };

    recorder.current.start();
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert("O seu navegador não suporta gravação");
      return;
    }

    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    createRecorder(audio);

    intervalRef.current = setInterval(() => {
      recorder.current?.stop();
      createRecorder(audio);
    }, 5000);
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <main className="relative flex flex-col items-center justify-center gap-8 min-h-screen px-6 py-12 bg-gradient-to-br from-black via-zinc-900 to-zinc-950 text-white">
      <Button
        variant="outline"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 border-white/30 text-almond hover:bg-white/10 transition"
        onClick={() => navigate(-1)}
        aria-label="Voltar"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </Button>

      <div className="flex items-center gap-3 select-none">
        <span
          className={`h-6 w-6 rounded-full transition-colors ${
            isRecording ? "bg-red-600 animate-pulse" : "bg-red-900"
          }`}
          aria-label={isRecording ? "Gravando" : "Parado"}
          title={isRecording ? "Gravando" : "Parado"}
        />
        <p className="text-xl font-mono font-semibold">
          {isRecording ? "Gravando..." : "Pausado"}
        </p>
      </div>

      <p className="text-khaki text-3xl font-mono font-bold select-none tabular-nums">
        {formatTime(secondsElapsed)}
      </p>

      {isRecording ? (
        <Button
          onClick={stopRecording}
          variant="destructive"
          className="px-12 py-3 text-lg font-semibold shadow-lg"
          aria-label="Pausar gravação"
        >
          Parar Gravação
        </Button>
      ) : (
        <Button
          onClick={startRecording}
          variant="default"
          className="px-12 py-3 text-lg font-semibold shadow-lg"
          aria-label="Iniciar gravação"
        >
          Gravar Áudio
        </Button>
      )}

      <p className="mt-6 text-sm text-zinc-400 select-none">
        Clipes enviados:{" "}
        <span className="font-semibold text-khaki tabular-nums">
          {clipsCount}
        </span>
      </p>
    </main>
  );
}
