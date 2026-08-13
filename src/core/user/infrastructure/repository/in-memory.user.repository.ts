import { Injectable } from '@nestjs/common';
import { User } from '../../domain/model/user.model';
import { type IUserRepository } from '../../domain/types/user.repository.interface';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private users = new Map<string, User>();

  findAll(): Promise<User[]> {
    return Promise.resolve(Array.from(this.users.values()));
  }

  findById(userId: string): Promise<User> {
    const user = this.users.get(userId);

    if (!user) return Promise.reject(new Error('User not found'));

    return Promise.resolve(user);
  }

  findByEmail(email: string): Promise<User> {
    const user = Array.from(this.users.values()).find((u) => u.email === email);

    if (!user) return Promise.reject(new Error('User not found'));

    return Promise.resolve(user);
  }

  upsert(user: User): Promise<User> {
    const newUser = User.create({
      email: user.email,
      username: user.username,
      provider: user.provider,
      providerId: user.providerId,
      role: user.role,
      avatarUrl: user.avatarUrl,
    });

    this.users.set(newUser.id, newUser);

    return Promise.resolve(newUser);
  }

  update(userId: string, user: Partial<User>): Promise<User> {
    const existing = this.users.get(userId);

    if (!existing) return Promise.reject(new Error('User not found'));

    const updated = User.create(
      {
        email: user.email ?? existing.email,
        username: user.username ?? existing.username,
        provider: existing.provider,
        providerId: existing.providerId,
        role: user.role ?? existing.role,
        avatarUrl: user.avatarUrl ?? existing.avatarUrl,
      },
      userId,
    );

    this.users.set(userId, updated);

    return Promise.resolve(updated);
  }

  delete(userId: string): Promise<void> {
    if (!this.users.has(userId))
      return Promise.reject(new Error('User not found'));
    this.users.delete(userId);
    return Promise.resolve();
  }
}
