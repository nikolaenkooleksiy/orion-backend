import { randomUUID } from 'crypto';

interface TaskModelProps {
  id: string;
  title: string;
  description: string | null;
  position: number;
}

interface CreateTaskModelProps {
  title: string;
  description: string | null;
  position: number;
}

export class TaskModel {
  private constructor(private props: TaskModelProps) {}

  static create(props: CreateTaskModelProps): TaskModel {
    return new TaskModel({
      id: randomUUID(),
      title: props.title,
      description: props.description,
      position: props.position,
    });
  }

  static restore(props: TaskModelProps): TaskModel {
    return new TaskModel(props);
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | null {
    return this.props.description ?? null;
  }

  get position(): number {
    return this.props.position;
  }
}
