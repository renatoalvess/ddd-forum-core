import type { PaginationParams } from '@/core/repositories/pagination-params'
import type { QuestionsRespository } from '@/domain/forum/aplication/repositories/question-repository'
import type { Question } from '@/domain/forum/enterprise/entities/question'
import { th } from '@faker-js/faker'

export class InMemoryQuestionsRepository implements QuestionsRespository {
  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)
    if (!question) {
      return null
    }
    return question
  }
  public items: Question[] = []

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)
    if (!question) {
      return null
    }
    return question
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
    return questions
  }

  async create(question: Question) {
    this.items.push(question)
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)
    this.items[itemIndex] = question
  }

  async delete(question: Question) {
    const questionIndex = this.items.findIndex((item) => item.id === question.id)
    if (questionIndex >= 0) {
      this.items.splice(questionIndex, 1)
    }
  }
}
