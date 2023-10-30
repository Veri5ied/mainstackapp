import Image from "next/image";
import { AppLogo } from "../../../public";
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { BiBarChartSquare } from "react-icons/bi";
import { MdOutlineWidgets } from "react-icons/md";
import Payment from "../custom-svgs/Payments";
import UserGroups from "../custom-svgs/CRM";
import { usePathname } from "next/navigation";
import { BsBell, BsChatLeftText } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";

const TopNavigation = () => {
  const pathname = usePathname();
  const navlinks = [
    {
      name: "Home",
      linkUrl: "/home",
      icon: <GoHome size={22} />,
    },
    {
      name: "Analytics",
      linkUrl: "/analytics",
      icon: <BiBarChartSquare size={22} />,
    },
    {
      name: "Revenue",
      linkUrl: "/",
      icon: <Payment />,
    },
    {
      name: "CRM",
      linkUrl: "/crm",
      icon: <UserGroups />,
    },
    {
      name: "Apps",
      linkUrl: "/apps",
      icon: <MdOutlineWidgets size={22} />,
    },
  ];
  return (
    <div className="topnavigation">
      <div className="topnavigation--left">
        <Image src={AppLogo} alt="mainstack" style={{ cursor: "pointer" }} />
      </div>
      <div className="topnavigation--center">
        {navlinks?.map(({ name, linkUrl, icon }, idx) => (
          <Link
            href={linkUrl}
            key={idx}
            className={pathname === linkUrl ? "topnav-active" : ""}
          >
            {icon}
            {name}
          </Link>
        ))}
      </div>
      <div className="topnavigation--right">
        <BsBell size={22} />
        <BsChatLeftText size={22} />
        <div className="topnavigation-right-menu">
          <div className="topnavigation-user">
            <h2>OJ</h2>
          </div>
          <AiOutlineMenu size={22} />
        </div>
      </div>
    </div>
  );
};

export default TopNavigation;
