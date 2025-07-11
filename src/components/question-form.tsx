import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateQuestion } from "@/http/use-create-question";

const MAX_CHARACTERS = 500;

const createQuestionSchema = z.object({
  question: z
    .string()
    .min(1, "Pergunta é obrigatória")
    .min(10, "Pergunta deve ter pelo menos 10 caracteres")
    .max(MAX_CHARACTERS, "Pergunta deve ter menos de 500 caracteres"),
});

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>;

interface QuestionFormProps {
  roomId: string;
}

export function QuestionForm({ roomId }: QuestionFormProps) {
  const { mutateAsync: createQuestion } = useCreateQuestion(roomId);

  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: { question: "" },
  });

  const { isSubmitting } = form.formState;
  const questionValue = form.watch("question") ?? "";
  const remainingChars = MAX_CHARACTERS - questionValue.length;

  const handleCreateQuestion = async (data: CreateQuestionFormData) => {
    await createQuestion(data);
    form.reset();
  };

  const isNearLimit = remainingChars <= 50;
  const isTooShort = questionValue.length > 0 && questionValue.length < 10;

  return (
    <Card className=" text-white rounded-2xl border-none bg-none">
      <CardHeader>
        <CardTitle className=" tracking-wide font-semibold text-2xl">
          Fazer uma Pergunta
        </CardTitle>
        <CardDescription className="text-almond text-sm tracking-wide max-w-lg">
          Digite sua pergunta abaixo para receber uma resposta gerada por IA.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateQuestion)}
            className="flex flex-col gap-6"
            noValidate
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-almond font-medium tracking-wide mb-1">
                    Sua Pergunta
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        {...field}
                        disabled={isSubmitting}
                        placeholder="Ex: Quais as vantagens de usar TypeScript com React?"
                        className="
                          min-h-[120px] max-h-[240px] resize-y
                          text-white placeholder:text-gray-400
                          rounded-lg border border-transparent
                          focus:outline-none focus:ring-2 focus:ring-khaki
                          focus:border-khaki
                          p-4
                          font-sans
                          leading-relaxed
                          whitespace-pre-wrap
                          overflow-auto
                          transition
                          shadow-sm
                        "
                        spellCheck={true}
                        aria-describedby="question-help"
                      />

                      <div
                        className="
                          absolute bottom-2 right-3
                          text-xs select-none
                   
                          px-2 py-0.5
                          rounded-full
                          font-mono
                          "
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        <span
                          className={`${
                            isNearLimit
                              ? "text-yellow-400"
                              : isTooShort
                              ? "text-red-500"
                              : "text-gray-400"
                          }`}
                        >
                          {questionValue.length}/{MAX_CHARACTERS}
                        </span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="mt-1 text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant={"outline"}
              disabled={isSubmitting}
              className="
                backdrop-blur-lg
                text-white
                hover:bg-khaki/90
                transition
                font-semibold
                shadow-lg
                rounded-lg
                py-3
              "
            >
              {isSubmitting ? "Enviando..." : "Enviar Pergunta"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
