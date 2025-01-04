import LoginVerify from "@/sections/auth/login/login-verify";
import { projectName } from "@/utils/constants";

export const metadata = {
  title: `${projectName} - OTP Verify`,
};
export default function LoginVerifyPage() {
  return (
    <div>
      <LoginVerify />
    </div>
  );
}
