import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository.js'
import { makeQuestion } from 'test/factories/make-question.js'
import { InMemoryQuestionCommentsRepository } from 'test/in-memory-question-comments-respository.js'
import { CommentOnQuestionUseCase } from './comment-on-question.js'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionsCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionsCommentsRepository)
  })

  it('should be able to comment on a question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comment on question',
    })

    expect(inMemoryQuestionsCommentsRepository.items[0]!.content).toEqual('Comment on question')
  })
})
