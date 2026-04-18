export default function HomeLayout({
  children,
  herosecion,
  popular,
  twoweel,
}: Readonly<{
  children: React.ReactNode;
  herosecion: React.ReactNode;
  popular: React.ReactNode;
  twoweel: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div>{herosecion}</div>
      <div></div>
      <div>{popular}</div>
      <div>{twoweel}</div>
    </>
  );
}
