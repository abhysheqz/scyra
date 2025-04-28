interface ICredentialsAuth {
  name?: string;
  email: string;
  password: string;
  type: "sign-in" | "sign-up";
}

interface IIconProps extends React.ComponentProps<"svg"> {}
