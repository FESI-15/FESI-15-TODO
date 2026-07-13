import SideMenu from "@/components/layout/SideMenu/SideMenu";

export default function WithHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-col flex md:flex-row">
      <SideMenu />
      {children}
    </div>
  );
}
