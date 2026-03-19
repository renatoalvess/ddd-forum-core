import { describe, expect, it, beforeEach } from 'vitest'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { FecthAnswerCommentsUseCase } from './fetch-answer-comments'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comments'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FecthAnswerCommentsUseCase

describe('Fetch Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FecthAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comment', async () => {
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }))

    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }))

    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }))

    const result = await sut.execute({ answerId: 'answer-1', page: 1 })

    expect(result.value?.answersComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }))
    }

    const result = await sut.execute({ answerId: 'answer-1', page: 2 })

    expect(result.value?.answersComments).toHaveLength(2)
  })
})
