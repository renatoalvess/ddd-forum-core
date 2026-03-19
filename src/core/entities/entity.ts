import { UniqueEntityId } from './unique-entity-id.js'

export class Entity<Props> {
  private _id: UniqueEntityId
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityId) {
    this.props = props
    this._id = id ?? new UniqueEntityId()
  }

  public equals(Entity: Entity<any>) {
    if (this === Entity) {
      return true
    }
    if (Entity.id === this._id) {
      return true
    }
    return false
  }
}
