import RegisterForm from "@/sections/auth/register/register-form";
import { projectName } from "@/utils/constants";

export const metadata = {
  title: `${projectName} - Register`,
};
export default function page() {
  return <RegisterForm />;
}
