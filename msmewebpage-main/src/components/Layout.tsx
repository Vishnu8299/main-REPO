import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F1F0FB]">
      <main className={cn("container mx-auto p-6", className)}>
        {children}
      </main>
    </div>
  );
};

export default Layout;