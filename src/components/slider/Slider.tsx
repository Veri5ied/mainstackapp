import { AiOutlineClose } from "react-icons/ai";

interface SliderProps {
  show: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
}

export default function Slider({
  show,
  setShowNav,
  title,
  children,
}: SliderProps) {
  return (
    <div className={show ? "slider active" : "slider"}>
      <div className="slider--title">
        <h3>{title}</h3>
        <AiOutlineClose
          onClick={() => setShowNav(false)}
          size={28}
          cursor="pointer"
        />
      </div>
      <>{children}</>
    </div>
  );
}
