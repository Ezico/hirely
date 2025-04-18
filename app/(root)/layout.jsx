import LeftSidebar from "@/components/LeftSidebar";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = ({ children }) => {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col ">
          <div className="mx-auto flex w-full flex-col ">
            <div className="flex flex-col md:pb-14">
              <Toaster />
              {children}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RootLayout;
