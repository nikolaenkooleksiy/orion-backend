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

  public rename(name: string) {
    const trimmed = name?.trim();
    if (!trimmed) throw new Error('Tag name cannot be empty');
    this.props.name = trimmed;
    this.touch();
  }

  public changeColor(color: string) {
    this.props.color = color;
    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
