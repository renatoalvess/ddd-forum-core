import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository.js'
import { GetQuestionBySlugUseCase } from './get-question-by-slug.js'
import { makeQuestion } from 'test/factories/make-question.js'
import { Slug } from '../../enterprise/entities/value-objects/slug.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('new-question'),
    })

    console.log(newQuestion)

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'new-question',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
