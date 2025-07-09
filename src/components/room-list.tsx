import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/spinner";
import { getRelativeTimeFromNow } from "../utils/format-relative-date";
import { UseRooms } from "@/http/use-rooms";

export function RoomList() {
  const { data, isLoading } = UseRooms();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Salas Recentes</CardTitle>
          <CardDescription>
            Acesso rápido para as salas criadas recentemente
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {isLoading && <LoadingSpinner />}

          {!isLoading && data?.length === 0 && (
            <p className="text-muted-foreground">Nenhuma sala encontrada.</p>
          )}

          {!isLoading &&
            data?.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
              >
                <Link
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent/50"
                  to={`/room/${room.id}`}
                >
                  <div className="flex flex-1 flex-col gap-1">
                    <h3 className="font-medium text-sm ">{room.name}</h3>

                    <div className="flex items-center gap-2">
                      <Badge className="text-xs" variant="secondary">
                        Criada {getRelativeTimeFromNow(room.createdAt)}
                      </Badge>
                      <Badge className="text-xs" variant="secondary">
                        {room.questionsCount} pergunta(s)
                      </Badge>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 text-sm">
                    Entrar
                    <ArrowRight className="size-3" />
                  </span>
                </Link>
              </motion.div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
