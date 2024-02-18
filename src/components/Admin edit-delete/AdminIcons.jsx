import { MdModeEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import DeleteModal from "./DeleteModal";

export default function ({resource}) {
  const [reqError, setReqError] = useState("");
  const { user, loading } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {user && !loading && user.user_type === "admin" && (
        <div className="icon-container">
          <MdModeEdit onClick={() => {}} className="icon" title="Edit" />
          <FaTrashCan
            onClick={() => {
              setIsOpen(true);
            }}
            className="icon"
            title="Delete"
          />
        </div>
      )}
      {reqError && <div>{reqError}</div>}
      <DeleteModal
        isOpen={isOpen}
        setIsOpen={(v) => {
          setIsOpen(v);
        }}
        resource={resource}
      />
    </>
  );
}
