export enum Role {
  USER = "User",
  ADMIN = "Admin",
  EMPLOYEE = "Employee",
}

export enum TwoFAModes {
  EMAIL = "Email",
  PHONE = "Phone",
  AUTHENTICATOR = "Authenticator",
}

export enum Purpose {
  SIGNUP = "Register",
  RESET_PASSWORD = "PasswordChange",
  VERIFY_PHONE_NUMBER = "VerifyPhone",
  LOGIN = "LoginWithCode",
  FORGET_PASSWORD = "ForgetPassword",
}

export enum MediaType {
  PROFILE = "Profile",
  COVER = "Cover",
  POSTS = "Posts",
}

export enum Status {
  ACCEPTED = "Accepted",
  PENDING = "Pending",
  REJECTED = "Rejected",
}
