import { UserRole, type AuthProvider } from '@prisma/client';
import { randomUUID } from 'crypto';

export interface CreateUserProps {
  username: string;
  email: string;
  provider: AuthProvider;
  providerId: string;
  avatarUrl?: string | null;
  role?: UserRole;
}

export interface UserProps {
  id: string;
  username: string;
  avatarUrl: string | null;
  email: string;
  role: UserRole;
  provider: AuthProvider;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private constructor(private props: UserProps) {}

  static create(props: CreateUserProps, id?: string): User {
    const now = new Date();

    return new User({
      id: id ?? randomUUID(),
      username: props.username,
      email: props.email,
      avatarUrl: props.avatarUrl ?? null,
      role: props.role ?? UserRole.User,
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

  public updateRole(role: UserRole): void {
    this.props.role = role;
    this.props.updatedAt = new Date();
  }

  public toProps(): UserProps {
    return { ...this.props };
  }

  get id(): string {
    return this.props.id;
  }

  get username(): string {
    return this.props.username;
  }

  get avatarUrl(): string | null {
    return this.props.avatarUrl;
  }

  get email(): string {
    return this.props.email;
  }

  get role(): UserRole {
    return this.props.role;
  }

  get provider(): AuthProvider {
    return this.props.provider;
  }

  get providerId(): string {
    return this.props.providerId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
