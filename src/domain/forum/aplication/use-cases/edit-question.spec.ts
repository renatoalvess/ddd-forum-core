import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository.js'
import { makeQuestion } from 'test/factories/make-question.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { EditQuestionUseCase } from './edit-question.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      title: 'Pergunta editada',
      content: 'Conteúdo da pergunta editada',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      props: {
        title: 'Pergunta editada',
        content: 'Conteúdo da pergunta editada',
      },
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() => {
      return sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: 'author-2',
        title: 'Pergunta editada',
        content: 'Conteúdo da pergunta editada',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
