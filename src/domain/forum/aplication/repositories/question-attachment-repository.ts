import type { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface QuestionAttachmentRespository {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  deleteManyByQuestionId(questionId: string): Promise<void>
}
