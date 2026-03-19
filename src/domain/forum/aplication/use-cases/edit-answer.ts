import { left, right, type Either } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import type { AnswersRespository } from '../repositories/answers-respository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import type { AnswerAttachmentRespository } from '../repositories/answer-attachemnt-respository'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content?: string
  attachmentsIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(
    private answerRepository: AnswersRespository,
    private answerAttachmentRepository: AnswerAttachmentRespository,
  ) {}

  async execute({
    authorId,
    content,
    answerId,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments = await this.answerAttachmentRepository.findManyByAnswerId(answerId)

    const answerAttachmentsList = new AnswerAttachmentList(currentAnswerAttachments)

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachmentsList.update(answerAttachments)

    answer.attachments = answerAttachmentsList

    answer.content = content ?? answer.content

    await this.answerRepository.save(answer)

    return right({
      answer,
    })
  }
}
