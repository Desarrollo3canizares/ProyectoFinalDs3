import { User } from './Usuario';

export class RoleValidator {
  isSuscriptor(user: User): boolean {
    return user.role === 'REPARTIDOR';
  }

  isEditor(user: User): boolean {
    return user.role === 'CLIENTE';
  }

  isAdmin(user: User): boolean {
    return user.role === 'ADMIN';
  }
}