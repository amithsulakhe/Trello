import { AuthGuard } from "@/auth/guard/auth-guard";

import Header from "@/components/header";
import SideBarComponent from "@/components/side-bar-component";

const Layout = ({ children }) => (
  <div>
    <AuthGuard>
      <Header />
      <SideBarComponent>{children}</SideBarComponent>
    </AuthGuard>
  </div>
);

export default Layout;
