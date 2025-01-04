import { GuestGuard } from "@/auth/guard/guest-guard";

const Layout = ({ children }) => (
  <div>
    <GuestGuard>
      <main className="h-screen w-full flex justify-center items-center">
        {children}
      </main>
    </GuestGuard>
  </div>
);

export default Layout;
