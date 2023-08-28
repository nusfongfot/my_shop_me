import { ReactNode } from "react";
import Footer from "../footer";
import ResponsiveAppBar from "../navbar";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <ResponsiveAppBar />
      {children}
      <Footer />
    </div>
  );
}
