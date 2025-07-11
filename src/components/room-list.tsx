import { useState, useMemo, useEffect } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRooms } from '@/http/use-rooms'
import { dayjs } from '@/lib/dayjs'
import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

const ROOMS_PER_PAGE = 3

export function RoomList() {
  const { data: rooms = [], isLoading, error } = useRooms()

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return rooms.filter((room) =>
      room.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [rooms, search])

  const paginated = useMemo(() => {
    const start = (page - 1) * ROOMS_PER_PAGE
    return filtered.slice(start, start + ROOMS_PER_PAGE)
  }, [filtered, page])

  const totalPages = Math.ceil(filtered.length / ROOMS_PER_PAGE)

  useEffect(() => {
    setPage(1)
  }, [search])

  return (
    <Card className="border bg-gradient-to-br border-walnut_brown shadow-lgd shadow-2xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-khaki text-2xl font-semibold tracking-tight">
          Salas Recentes
        </CardTitle>
        <CardDescription className="text-almond text-sm">
          Acesso rápido às salas criadas recentemente
        </CardDescription>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-2.5 size-4 text-walnut_brown" />
          <Input
            type="text"
            placeholder="Buscar por nome..."
            className="pl-9 bg-walnut_brown/10 border-walnut_brown/30 text-white placeholder:text-almond focus-visible:ring-khaki"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg bg-zinc-700/30" />
            ))}
          </>
        )}

        {!isLoading && error && (
          <p className="text-red-400 text-sm">Erro ao carregar as salas.</p>
        )}

        {!isLoading && filtered.length === 0 && (
          <p className="text-sm text-zinc-400">Nenhuma sala encontrada.</p>
        )}

        {paginated.map((room) => (
          <Link
            key={room.id}
            to={`/room/${room.id}`}
            className="group flex items-center justify-between rounded-lg border border-walnut_brown/30 bg-walnut_brown/5 p-4 transition hover:bg-walnut_brown/10 hover:border-walnut_brown/50"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-base text-almond font-medium">
                {room.name}
              </h3>

              <div className="flex items-center gap-2 text-xs text-khaki">
                <Badge variant="secondary" className="bg-khaki/20 text-khaki">
                  {dayjs(room.createdAt).toNow()}
                </Badge>
                <Badge variant="secondary" className="bg-khaki/20 text-khaki">
                  {room.questionsCount} pergunta(s)
                </Badge>
              </div>
            </div>

            <span className="flex items-center gap-1 text-sm text-khaki font-medium group-hover:translate-x-1 transition-transform">
              Entrar
              <ArrowRight className="size-4" />
            </span>
          </Link>
        ))}

        {filtered.length > ROOMS_PER_PAGE && (
          <div className="flex justify-between items-center mt-4">
            <Button
              size="sm"
              variant="ghost"
              className="text-khaki border border-khaki/30 hover:bg-khaki/10"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Anterior
            </Button>

            <span className="text-sm text-almond">
              Página <strong>{page}</strong> de {totalPages}
            </span>

            <Button
              size="sm"
              variant="ghost"
              className="text-khaki border border-khaki/30 hover:bg-khaki/10"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Próxima
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
