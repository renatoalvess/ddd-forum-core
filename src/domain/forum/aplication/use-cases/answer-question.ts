import type { AnswersRespository } from '../repositories/answers-respository.js'
import { Answer } from '@/domain/forum/enterprise/entities/answer.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { right, type Either } from '@/core/either.js'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRespository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })
    await this.answersRepository.create(answer)
    return right({
      answer,
    })
  }
}
