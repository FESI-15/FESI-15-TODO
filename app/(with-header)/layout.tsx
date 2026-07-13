import SideMenu from "@/components/layout/SideMenu/SideMenu";

export default function WithHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SideMenu />
      {children}
    </div>
  );
}
