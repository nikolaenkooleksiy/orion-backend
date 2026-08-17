import { Injectable } from '@nestjs/common';
import { User } from '../../domain/model/user.model';
import { type IUserRepository } from '../../domain/types/user.repository.interface';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private users = new Map<string, User>();

  findAll() {
    return Promise.resolve(Array.from(this.users.values()));
  }

  findById(userId: string) {
    const user = this.users.get(userId);

    if (!user) return Promise.reject(new Error('User not found'));

    return Promise.resolve(user);
  }

  findByEmail(email: string) {
    const user = Array.from(this.users.values()).find((u) => u.email === email);

    if (!user) return Promise.reject(new Error('User not found'));

    return Promise.resolve(user);
  }

  create(user: User) {
    if (this.users.has(user.id)) {
      return Promise.reject(new Error('User with this ID already exists'));
    }

    for (const existing of this.users.values()) {
      if (existing.email === user.email) {
        return Promise.reject(new Error('User with this email already exists'));
      }

      if (existing.name === user.name) {
        return Promise.reject(new Error('User with this name already exists'));
      }
    }

    this.users.set(user.id, user);

    return Promise.resolve(user);
  }

  update(user: User) {
    const existingUser = this.users.get(user.id);

    if (!existingUser) return Promise.reject(new Error('User not found'));

    this.users.set(user.id, user);

    return Promise.resolve(user);
  }
  upsert(user: User) {
    const existingUser = Array.from(this.users.values()).find(
      (u) => u.email === user.email || u.id === user.id,
    );

    if (existingUser) {
      this.users.delete(existingUser.id);
    }

    this.users.set(user.id, user);
    return Promise.resolve(user);
  }

  delete(userId: string) {
    if (!this.users.has(userId))
      return Promise.reject(new Error('User not found'));
    this.users.delete(userId);
    return Promise.resolve();
  }
}
