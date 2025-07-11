import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const createRoomSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Inclua no mínimo 3 caracteres" })
    .max(50, { message: "Máximo 50 caracteres" }),
  description: z.string().max(200, { message: "Máximo 200 caracteres" }),
});

type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
  const { mutateAsync: createRoom } = useCreateRoom();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [formData, setFormData] = useState<CreateRoomFormData | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const createRoomForm = useForm<CreateRoomFormData>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    createRoomForm.setFocus("name");
  }, []);

  async function onConfirmCreate() {
    if (!formData) return;
    setFeedbackMsg(null);
    try {
      await createRoom(formData);
      setFeedbackMsg({ type: "success", text: "Sala criada com sucesso." });
      createRoomForm.reset();
      setOpenConfirm(false);
    } catch (error) {
      setFeedbackMsg({
        type: "error",
        text: "Falha ao criar sala. Tente novamente.",
      });
    }
  }

  function handleSubmit(data: CreateRoomFormData) {
    setFormData(data);
    setOpenConfirm(true);
  }

  return (
    <>
      <Card className="bg-gradient-to-br border border-walnut_brown shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-khaki text-xl font-semibold">
            Criar sala
          </CardTitle>
          <CardDescription className="text-almond">
            Crie uma nova sala para começar a fazer perguntas e receber
            respostas da I.A.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...createRoomForm}>
            <form
              className="flex flex-col gap-6"
              onSubmit={createRoomForm.handleSubmit(handleSubmit)}
              noValidate
            >
              <FormField
                control={createRoomForm.control}
                name="name"
                render={({ field, formState }) => {
                  const valueLength = field.value.length;
                  const maxLength = 50;
                  const isError = !!formState.errors.name;
                  return (
                    <FormItem>
                      <FormLabel>Nome da sala</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite o nome da sala..."
                          maxLength={maxLength}
                          className={`border ${
                            isError ? "border-red-500" : "border-khaki/70"
                          } bg-black/20 text-almond placeholder:text-walnut_brown`}
                        />
                      </FormControl>
                      <div className="flex justify-between text-xs mt-1">
                        <FormMessage />
                        <span
                          className={`text-walnut_brown ${
                            valueLength > maxLength * 0.9 ? "text-red-500" : ""
                          }`}
                        >
                          {valueLength}/{maxLength}
                        </span>
                      </div>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={createRoomForm.control}
                name="description"
                render={({ field, formState }) => {
                  const valueLength = field.value.length;
                  const maxLength = 200;
                  const isError = !!formState.errors.description;
                  return (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          maxLength={maxLength}
                          className={`border ${
                            isError ? "border-red-500" : "border-khaki/70"
                          } bg-black/20 text-almond placeholder:text-walnut_brown resize-none`}
                          placeholder="Descreva a sala (opcional)"
                        />
                      </FormControl>
                      <div className="flex justify-between text-xs mt-1">
                        <FormMessage />
                        <span
                          className={`text-walnut_brown ${
                            valueLength > maxLength * 0.9 ? "text-red-500" : ""
                          }`}
                        >
                          {valueLength}/{maxLength}
                        </span>
                      </div>
                    </FormItem>
                  );
                }}
              />

              <Button
                className="w-full bg-white hover:bg-khaki/90 text-black font-bold py-3 rounded-md transition"
                type="submit"
              >
                Criar sala
              </Button>
            </form>

            {feedbackMsg && (
              <p
                className={`mt-4 text-center font-semibold ${
                  feedbackMsg.type === "success" ? "text-khaki" : "text-red-500"
                }`}
                role="alert"
              >
                {feedbackMsg.text}
              </p>
            )}
          </Form>
        </CardContent>
      </Card>

      <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <DialogContent className="bg-black/90 border border-khaki rounded-lg p-6 shadow-lg max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-khaki font-semibold text-lg">
              Confirmar criação da sala
            </DialogTitle>
          </DialogHeader>
          <p className="text-almond mb-6">
            Tem certeza que deseja criar a sala{" "}
            <span className="font-bold text-khaki">{formData?.name}</span>?
          </p>
          <DialogFooter className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setOpenConfirm(false)}>
              Cancelar
            </Button>
            <Button variant="default" onClick={onConfirmCreate}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  ); 
}
