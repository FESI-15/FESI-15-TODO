import SideMenu from "@/components/layout/SideMenu/SideMenu";

export default function WithHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideMenu />
      {children}
    </>
  );
}
