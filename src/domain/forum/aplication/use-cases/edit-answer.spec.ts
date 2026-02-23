import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryAnswersRepository } from 'test/in-memory-answers-repository.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { EditAnswerUseCase } from './edit-answer.js'
import { makeAnswer } from 'test/factories/make-answers.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toValue(),
      authorId: 'author-1',
      content: 'Conteúdo da pergunta editada',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      props: {
        content: 'Conteúdo da pergunta editada',
      },
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() => {
      return sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'author-2',
        content: 'Conteúdo da pergunta editada',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
