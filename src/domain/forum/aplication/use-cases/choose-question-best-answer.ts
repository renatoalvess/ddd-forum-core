import type { AnswersRespository } from '../repositories/answers-respository.js'
import type { Question } from '../../enterprise/entities/question.js'
import type { QuestionsRespository } from '../repositories/question-repository.js'
import { left, right, type Either } from '@/core/either.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

interface ChooseQuestionBestAnswerCaseRequest {
  answerId: string
  authorId: string
}

type ChooseQuestionBestAnswerCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAnswerCase {
  constructor(
    private questionsRepository: QuestionsRespository,
    private answersRepository: AnswersRespository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerCaseRequest): Promise<ChooseQuestionBestAnswerCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionsRepository.findById(answer.questionId.toValue())

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerId = answer.id
    await this.questionsRepository.save(question)

    return right({
      question,
    })
  }
}
