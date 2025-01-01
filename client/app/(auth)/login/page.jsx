import LoginForm from "@/sections/auth/login/login-form";
import { projectName } from "@/utils/constants";

export const metadata = {
  title: `${projectName} - Login`,
};
export default function LoginPage() {
  return <LoginForm />;
}
