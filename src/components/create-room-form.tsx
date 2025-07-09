import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/v4";
import { useCreateRoom } from "@/http/use-create-room";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { motion } from "framer-motion";

const createRoomSchema = z.object({
  name: z.string().min(3, { message: "Inclua no mínimo 3 caracteres" }),
  description: z.string(),
});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
  const { mutateAsync: createRoom } = useCreateRoom();

  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function handleCreateRoom(data: CreateRoomFormData) {
    try {
      await createRoom(data);
      toast.success("Sala criada com sucesso!");
      createRoomForm.reset();
    } catch {
      toast.error("Erro ao criar a sala.");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Criar Sala</CardTitle>
          <CardDescription>
            Crie uma nova sala para começar a fazer perguntas e receber
            respostas de I.A
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...createRoomForm}>
            <form
              className="flex flex-col gap-4"
              onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
            >
              <FormField
                control={createRoomForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da sala</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o nome da sala..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={createRoomForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full" type="submit">
                  Criar sala
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
