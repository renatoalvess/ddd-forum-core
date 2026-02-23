import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import type { AnswerCommentsRespository } from '../repositories/answer-comments-repository'
import { AnswerComment } from '../../enterprise/entities/answer-coment'
import type { AnswersRespository } from '../repositories/answers-respository'
import { left, right, type Either } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepository: AnswersRespository,
    private answerCommentsRepository: AnswerCommentsRespository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })
    await this.answerCommentsRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}
