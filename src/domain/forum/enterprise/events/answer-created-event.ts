import type { DomainEvent } from '@/core/events/domain-event'
import { Answer } from '../entities/answer'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id'

export class AnswerCreatedEvent implements DomainEvent {
  public answer: Answer
  public occurredAt: Date

  constructor(answer: Answer) {
    this.answer = answer
    this.occurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.answer.id
  }
}
