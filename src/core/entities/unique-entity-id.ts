export class UniqueEntityId {
  private value: string

  constructor(value?: string) {
    this.value = value ?? crypto.randomUUID()
  }

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  equals(id: UniqueEntityId) {
    return id.toString() === this.value
  }
}
