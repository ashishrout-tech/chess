import "@overpowered-monorepo/tailwind-class";
import Layout2 from "./layout2";
import Navbar from "@overpowered-monorepo/ui/components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout2 component = {children} />
      </body>
    </html>
  );
}
