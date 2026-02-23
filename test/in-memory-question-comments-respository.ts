import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { QuestionCommentsRespository } from '@/domain/forum/aplication/repositories/question-comments-repository'
import type { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRespository {
  public items: QuestionComment[] = []

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString() === id)
    if (!questionComment) {
      return null
    }
    return questionComment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
      const questoinComments = this.items
        .filter((item) => item.questionId.toString() === questionId)
        .slice((page - 1) * 20, page * 20)
      return questoinComments
    }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
      const questionIndex = this.items.findIndex((item) => item.id === questionComment.id)
      if (questionIndex >= 0) {
        this.items.splice(questionIndex, 1)
      }
    }
}
