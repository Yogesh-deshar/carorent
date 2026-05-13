export default function HomeLayout({
  children,
  herosecion,
  popular,
  twoweel,
  fourweel,
}: Readonly<{
  children: React.ReactNode;
  herosecion: React.ReactNode;
  popular: React.ReactNode;
  twoweel: React.ReactNode;
  fourweel: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div>{herosecion}</div>

      <div>{popular}</div>
      <div>{twoweel}</div>
      <div>{fourweel}</div>
    </>
  );
}
