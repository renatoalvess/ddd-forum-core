import type { QuestionsRespository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

interface FetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRespository) {}

  async execute({ page }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const question = await this.questionRepository.findManyRecent({ page })

    return {
      questions: question,
    }
  }
}
