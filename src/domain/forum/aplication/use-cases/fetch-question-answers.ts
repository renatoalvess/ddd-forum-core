import type { AnswersRespository } from '../repositories/answers-respository'
import type { Answer } from '../../enterprise/entities/answer'
import { right, type Either } from '@/core/either'

interface FecthQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FecthQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FecthQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRespository) {}

  async execute({
    questionId,
    page,
  }: FecthQuestionAnswersUseCaseRequest): Promise<FecthQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page })

    return right({
      answers,
    })
  }
}
