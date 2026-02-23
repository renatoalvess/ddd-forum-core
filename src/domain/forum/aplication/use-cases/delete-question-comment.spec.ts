import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryQuestionCommentsRepository } from 'test/in-memory-question-comments-respository.js'
import { DeleteQuestionCommentUseCase } from './delete-question-comment.js'
import { makeQuestionComment } from 'test/factories/make-question-comment.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

let inMemoryQuestionsCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionsCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionsCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionsCommentsRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })

    expect(inMemoryQuestionsCommentsRepository.items).toHaveLength(0)
  })

  it('should be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryQuestionsCommentsRepository.create(questionComment)

    expect(() =>
      sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
