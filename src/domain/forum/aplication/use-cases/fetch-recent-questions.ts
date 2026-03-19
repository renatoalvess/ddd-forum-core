import type { QuestionsRespository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'
import { right, type Either } from '@/core/either'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRespository) {}

  async execute({ page }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const question = await this.questionRepository.findManyRecent({ page })

    return right({
      questions: question,
    })
  }
}
