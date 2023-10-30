import Image from "next/image";
import { MdReceiptLong } from "react-icons/md";

type EmptyStateProps = {
  onClick: () => void;
};

const EmptyState = ({ onClick }: EmptyStateProps) => {
  return (
    <div className="emptystate__container">
      <div className="emptystate-icon">
        <MdReceiptLong size={22} color="#131316" />
      </div>
      <h3>No matching transaction found for the selected filter</h3>
      <p>Change your filters to see more results, or add a new product.</p>
      <button onClick={onClick}>Clear Filter</button>
    </div>
  );
};

export default EmptyState;
