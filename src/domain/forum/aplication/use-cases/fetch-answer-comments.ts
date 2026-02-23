import type { AnswerComment } from '../../enterprise/entities/answer-coment'
import type { AnswerCommentsRespository } from '../repositories/answer-comments-repository'

interface FecthAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

interface FecthAnswerCommentsUseCaseResponse {
  answersComments: AnswerComment[]
}

export class FecthAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRespository) {}

  async execute({ answerId, page }: FecthAnswerCommentsUseCaseRequest): Promise<FecthAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page })

    return {
      answersComments: answerComments,
    }
  }
}
