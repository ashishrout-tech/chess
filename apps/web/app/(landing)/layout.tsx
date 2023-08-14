import Navbar from "@overpowered-monorepo/ui/components/Navbar"

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" m-0 p-0 bg-slate-800">
        <div className=" h-fit bg-slate-800">
          <Navbar url="home" />
          {children}
        </div>S
      </body>
    </html>
  );
}
