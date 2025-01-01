import { AuthGuard } from "@/auth/guard/auth-guard";
import Footer from "@/components/footer";
import Header from "@/components/header";

const Layout = ({ children }) => (
  <div>
    <AuthGuard>
      <Header />
      <main>{children}</main>
      <Footer />
    </AuthGuard>
  </div>
);

export default Layout;
