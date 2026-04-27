export const metadata = {
  title: "RKWK - Library System",
  description:
    "Solusi manajemen perpustakaan modern untuk mendukung operasional dan aksesibilitas buku di Rumah Kreatif Wadas Kelir.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="relative min-h-screen bg-white text-black overflow-hidden"
        suppressHydrationWarning
      >
        <main className="flex items-center justify-center min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
