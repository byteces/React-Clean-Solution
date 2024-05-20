export interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  needVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export interface signInType {
  title?: string;
}
