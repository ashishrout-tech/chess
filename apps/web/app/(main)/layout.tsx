import Navbar from "@overpowered-monorepo/ui/components/Navbar";

export default function GameLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div className=" touch-none h-screen bg-slate-800 py-2">
                    <Navbar url = "game" />
                    {children}
                </div>
            </body>
        </html>
    );
}
