import { right, type Either } from '@/core/either'
import type { AnswerComment } from '../../enterprise/entities/answer-coment'
import type { AnswerCommentsRespository } from '../repositories/answer-comments-repository'

interface FecthAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FecthAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answersComments: AnswerComment[]
  }
>

export class FecthAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRespository) {}

  async execute({ answerId, page }: FecthAnswerCommentsUseCaseRequest): Promise<FecthAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page })

    return right({
      answersComments: answerComments,
    })
  }
}
