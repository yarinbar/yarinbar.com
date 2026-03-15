import { ReactNode } from "react";
import Header from "./Header";
import SkipLink from "@/components/ui/SkipLink";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content">
        {children}
      </main>
    </>
  );
}
