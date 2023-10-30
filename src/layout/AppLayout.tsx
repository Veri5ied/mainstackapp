import TopNavigation from "@/components/navigation/Topnavigation";
import AppBar from "@/components/app-bar/AppBar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="applayout__container">
      <div className="applayout__top-section">
        <TopNavigation />
      </div>
      <div className="applayout__side-section">
        <AppBar />
      </div>
      <div className="applayout__children-section">{children}</div>
    </div>
  );
};

export default AppLayout;
