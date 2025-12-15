type UserClaim = { type: string; value: string };
export type User = {
  name: string | null;
  isAuthenticated: boolean;
  claims: UserClaim[];
};
