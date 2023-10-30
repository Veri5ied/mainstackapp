import {
  IconBarOne,
  IconBarTwo,
  IconBarThree,
  IconBarFour,
} from "../../../public";
import Image from "next/image";

const barIcons = [IconBarOne, IconBarTwo, IconBarThree, IconBarFour];

const AppBar = () => {
  return (
    <div className="appbar__container">
      {barIcons.map((icon, idx) => (
        <Image src={icon} alt="icon" key={idx} />
      ))}
    </div>
  );
};

export default AppBar;
