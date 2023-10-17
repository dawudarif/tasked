export interface IUserProfile {
  userProfile: {
    id: string;
    email: string;
    username: string;
    name: string;
  };
}

export interface IPanelItem {
  id: number;
  name: string;
  icon: JSX.Element;
}
