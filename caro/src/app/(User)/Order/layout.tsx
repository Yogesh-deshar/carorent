export default function HomeLayout({
  children,
  cardetail,
  bookform,
  recom,
}: Readonly<{
  children: React.ReactNode;
  cardetail: React.ReactNode;
  bookform: React.ReactNode;
  recom: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div>{cardetail}</div>
      <div>{bookform}</div>
      <div>{recom}</div>
    </>
  );
}
