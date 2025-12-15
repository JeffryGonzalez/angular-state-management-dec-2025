type UserClaim = { type: string; value: string };
export type User = {
  name: string | null;
  id: string | null;
  isAuthenticated: boolean;
  claims: UserClaim[];
};
