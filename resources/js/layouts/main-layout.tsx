
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { AssignTaskModal } from "@/components/modal/assign-task-modal";
import { Toaster } from "@/components/ui/sonner";
import AiChat from "@/components/modal/ai-chat";

type PageLayoutProps = {
  children: React.ReactNode;
  crumb?: React.ReactNode;
};



const MainLayout = ({ children, crumb }: PageLayoutProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileSidebar = () => {    
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowAssignTaskModal(false);
    };

  return (
    <div className="flex h-screen w-full">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex" />

      {/* Mobile Sidebar */}
      {isMobile && (
        <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
          <SheetContent side="left" className="p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      )}

      <div className="flex flex-col flex-1 min-h-screen overflow-hidden">
        <TopBar onMenuButtonClick={toggleMobileSidebar}  setShowAssignTaskModal={setShowAssignTaskModal} crumb={crumb} />
        <main className="flex-1 overflow-auto parent-dash">
           <AssignTaskModal
          open={showAssignTaskModal} 
          onClose={setShowAssignTaskModal} 
        />
          <div className="container mx-auto p-4 md:p-6">
             <Toaster />
            {children}</div>
        </main>
        {/* <AiChat /> */}
      </div>
    </div>
  );
};

export default MainLayout;
