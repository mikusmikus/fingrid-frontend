export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col t">{children}</div>;
}
