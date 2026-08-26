import { randomUUID } from 'crypto';

export enum AuthProvider {
  CREDENTIALS = 'CREDENTIALS',
  GOOGLE = 'GOOGLE',
  GITHUB = 'GITHUB',
}

export interface CreateUserProps {
  name: string;
  email: string;
  avatarUrl?: string | null;
  password?: string | null;
  provider?: AuthProvider;
  providerId?: string | null;
}

export interface UserProps {
  id: string;
  name: string;
  avatarUrl: string | null;
  email: string;
  provider: AuthProvider;
  providerId: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private constructor(private props: UserProps) {}

  static create(props: CreateUserProps): User {
    const now = new Date();

    return new User({
      id: randomUUID(),
      name: props.name,
      email: props.email,
      password: props.password ?? null,
      provider: props.provider ?? AuthProvider.CREDENTIALS,
      providerId: props.providerId ?? null,
      avatarUrl: props.avatarUrl ?? null,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(props: UserProps): User {
    return new User(props);
  }

  public toProps(): UserProps {
    return { ...this.props };
  }

  public updateAvatarUrl(avatarUrl: string | null): void {
    this.props.avatarUrl = avatarUrl;
    this.props.updatedAt = new Date();
  }

  public changeName(name: string): void {
    if (!name || name.trim() === '') {
      throw new Error('Name cannot be empty');
    }

    this.props.name = name;
    this.props.updatedAt = new Date();
  }

  public changePassword(newPasswordHash: string): void {
    if (!newPasswordHash || newPasswordHash.trim() === '') {
      throw new Error('Password cannot be empty');
    }

    if (this.props.password && this.props.password === newPasswordHash) {
      throw new Error('New password cannot be the same as the old password');
    }

    this.props.password = newPasswordHash;
    this.props.updatedAt = new Date();
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

  get password(): string | null {
    return this.props.password;
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
