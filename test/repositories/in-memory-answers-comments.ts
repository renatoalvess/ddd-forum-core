import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { AnswerCommentsRespository } from '@/domain/forum/aplication/repositories/answer-comments-repository'
import type { AnswerComment } from '@/domain/forum/enterprise/entities/answer-coment'

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRespository {
  public items: AnswerComment[] = []

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id)
    if (!answerComment) {
      return null
    }
    return answerComment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const questoinComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
    return questoinComments
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment) {
    const answerIndex = this.items.findIndex((item) => item.id === answerComment.id)
    if (answerIndex >= 0) {
      this.items.splice(answerIndex, 1)
    }
  }
}
