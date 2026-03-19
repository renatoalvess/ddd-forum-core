import type { QuestionAttachmentRespository } from '@/domain/forum/aplication/repositories/question-attachment-repository'
import type { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentRespository {
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter((item) => item.questionId.toString() === questionId)
    return questionAttachments
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter((item) => item.questionId.toString() != questionId)
    this.items = questionAttachments
  }
}
