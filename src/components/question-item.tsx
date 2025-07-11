import { Bot, Loader2, MessageSquare } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { dayjs } from '@/lib/dayjs'

interface Question {
  id: string
  question: string
  answer?: string | null
  createdAt: string
  isGeneratingAnswer?: boolean
}

interface QuestionItemProps {
  question: Question
}

export function QuestionItem({ question }: QuestionItemProps) {
  return (
    <Card className=" shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="space-y-5">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full ">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex-1">
            <p className="mb-1 font-semibold ">Pergunta</p>
            <p className="whitespace-pre-line  text-sm leading-relaxed">
              {question.question}
            </p>
          </div>
        </div>

        {(!!question.answer || question.isGeneratingAnswer) && (
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full ">
                <Bot className="h-6 w-6 text-green-700" />
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-1 font-semibold ">Resposta da IA</p>
              <div className="text-gray-300">
                {question.isGeneratingAnswer ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <span className="text-blue-600 text-sm italic">
                      Gerando resposta...
                    </span>
                  </div>
                ) : (
                  <p className="whitespace-pre-line text-sm leading-relaxed">
                    {question.answer}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <span className="text-gray-400 text-xs select-none">
            {dayjs(question.createdAt).toNow()}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
