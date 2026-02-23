import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { AnswersRespository } from '@/domain/forum/aplication/repositories/answers-respository'
import type { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRespository {
  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)
    if (!answer) {
      return null
    }
    return answer
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
    return answers
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async save(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items[itemIndex] = answer
  }
  async delete(answer: Answer) {
    const answerIndex = this.items.findIndex((item) => item.id === answer.id)
    if (answerIndex >= 0) {
      this.items.splice(answerIndex, 1)
    }
  }
  public items: Answer[] = []
}
