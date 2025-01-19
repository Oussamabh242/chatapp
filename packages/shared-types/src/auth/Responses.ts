export class Profile {
  fullName: string;
  email: string;
}

export class ProfileResponse {
  profile?: Profile;
  message?: string;
}

export class SignInResponse {
  message: string;
  accessToken?: string;
}
