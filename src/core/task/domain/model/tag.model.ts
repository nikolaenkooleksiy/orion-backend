import { randomUUID } from 'crypto';
import { CreateTagProps, TagProps } from '../types/tag.types';

export class TagModel {
  private constructor(private props: TagProps) {}

  static create(props: CreateTagProps) {
    const now = new Date();
    return new TagModel({
      ...props,
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(props: TagProps) {
    return new TagModel(props);
  }

  public getProps() {
    return this.props;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get color() {
    return this.props.color;
  }

  get workspaceId() {
    return this.props.workspaceId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
