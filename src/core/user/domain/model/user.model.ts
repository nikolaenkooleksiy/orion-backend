import { type AuthProvider } from '@prisma/client';
import { randomUUID } from 'crypto';

export interface CreateUserProps {
  name: string;
  email: string;
  provider: AuthProvider;
  providerId: string | null;
  avatarUrl?: string | null;
}

export interface UserProps {
  id: string;
  name: string;
  avatarUrl: string | null;
  email: string;
  provider: AuthProvider;
  providerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private constructor(private props: UserProps) {}

  static create(props: CreateUserProps, id?: string): User {
    const now = new Date();

    return new User({
      id: id ?? randomUUID(),
      name: props.name,
      email: props.email,
      avatarUrl: props.avatarUrl ?? null,
      provider: props.provider,
      providerId: props.providerId,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(props: UserProps): User {
    return new User(props);
  }

  public updateAvatarUrl(avatarUrl: string | null): void {
    this.props.avatarUrl = avatarUrl;
    this.props.updatedAt = new Date();
  }

  public toProps(): UserProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get avatarUrl(): string | null {
    return this.props.avatarUrl;
  }

  get email(): string {
    return this.props.email;
  }

  get provider(): AuthProvider {
    return this.props.provider;
  }

  get providerId(): string | null {
    return this.props.providerId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
