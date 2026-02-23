import { Answer } from '../../enterprise/entities/answer'
import type { AnswersRespository } from '../repositories/answers-respository'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content?: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRespository) {}

  async execute({ authorId, content, answerId }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('You are not the author of this answer')
    }

    answer.content = content ?? answer.content

    await this.answerRepository.save(answer)

    return {
      answer,
    }
  }
}
