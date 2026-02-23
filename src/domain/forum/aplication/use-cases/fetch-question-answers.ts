import type { AnswersRespository } from '../repositories/answers-respository'
import type { Answer } from '../../enterprise/entities/answer'

interface FecthQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FecthQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class FecthQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRespository) {}

  async execute({
    questionId,
    page,
  }: FecthQuestionAnswersUseCaseRequest): Promise<FecthQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page })

    return {
      answers: answers,
    }
  }
}
