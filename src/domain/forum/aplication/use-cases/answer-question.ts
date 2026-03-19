import type { AnswersRespository } from '../repositories/answers-respository.js'
import { Answer } from '@/domain/forum/enterprise/entities/answer.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { right, type Either } from '@/core/either.js'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment.js'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list.js'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  attachmentsIds: string[]
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
    attachmentsIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepository.create(answer)
    return right({
      answer,
    })
  }
}
