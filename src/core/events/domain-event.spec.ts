import { describe, expect, it, vi } from 'vitest'
import { DomainEvents } from './domain-events'
import { AggregateRoot } from '../entities/aggregate-root'
import type { DomainEvent } from './domain-event'
import type { UniqueEntityId } from '../entities/unique-entity-id'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  public aggregate: CustomAggregate // eslint-disable-line

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<any> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Subcriber cadastrando (Ouvindo) o evento de "resposta criada"
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Criar uma resposta, o que deve disparar o evento de "resposta criada"
    const aggregate = CustomAggregate.create()

    // Verificar se o evento foi disparado e ouvido corretamente
    expect(aggregate.domainEvents).toHaveLength(1)

    // Disparar os eventos da resposta criada
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
