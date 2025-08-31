export interface LoginType {
loggedIn: boolean;
token: string;
message: string;
userData: {
  id: string;
  email: string;
  username: string;
};
}
