export default function GameLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div className=" touch-none h-screen bg-slate-800">
                    {children}
                </div>
            </body>
        </html>
    );
}
