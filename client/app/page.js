import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";

export default function Home({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
