import { right, type Either } from '@/core/either'
import type { QuestionComment } from '../../enterprise/entities/question-comment'
import type { QuestionCommentsRespository } from '../repositories/question-comments-repository'

interface FecthQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FecthQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionsComments: QuestionComment[]
  }
>

export class FecthQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRespository) {}

  async execute({
    questionId,
    page,
  }: FecthQuestionCommentsUseCaseRequest): Promise<FecthQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId, { page })

    return right({
      questionsComments: questionComments,
    })
  }
}
