export class UserModel {
  public id: number;
  public username: string;
  public first_name: string;
  public last_name: string;
  public role: Role;

  constructor(data: any = {}) {
    this.id = data.id || void 0;
    this.username = data.username || void 0;
    this.first_name = data.first_name || void 0;
    this.last_name = data.last_name || void 0;
    this.role = data.role || Role.User;
  }
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  Manager = 'manager'
}
