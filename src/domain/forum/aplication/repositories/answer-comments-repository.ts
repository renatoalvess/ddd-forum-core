import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { AnswerComment } from '../../enterprise/entities/answer-coment'
import type { QuestionComment } from '../../enterprise/entities/question-comment'

export interface AnswerCommentsRespository {
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(answerId: string, params: PaginationParams): Promise<AnswerComment[]>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
