export class AuthenticationDto {
  email: string;
  password: string;

  public constructor(init?: Partial<AuthenticationDto>) {
    Object.assign(this, init);
  }
}
