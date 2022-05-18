export type CurrentUser = {
  id: string;
  email: string;
  iat: number;
};

export type User = {
  currentUser: CurrentUser | null;
};
