import { MdModeEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import DeleteModal from "./DeleteModal";
import EditCreatureModal from "./EditCreatureModal";
import EditCultureModal from "./EditCultureModal";
import EditEventModal from "./EditEventModal";

export default function ({ resourceType }) {
  const [reqError, setReqError] = useState("");
  const { user, loading, isOpen } = useUser();
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  return (
    <>
      {user && !loading && user.user_type === "admin" && (
        <div className={`icon-container ${isOpen && 'hide'}`}>
          <MdModeEdit
            onClick={() => {
              setIsOpenEdit(true);
            }}
            className="icon"
            title="Edit"
          />
          <FaTrashCan
            onClick={() => {
              setIsOpenDelete(true);
            }}
            className="icon"
            title="Delete"
          />
        </div>
      )}
      {reqError && <div>{reqError}</div>}
      <DeleteModal
        isOpen={isOpenDelete}
        setIsOpen={(v) => {
          setIsOpenDelete(v);
        }}
        resourceType={resourceType}
      />
      {resourceType === "creatures" && (
        <EditCreatureModal
          isOpen={isOpenEdit}
          setIsOpen={(v) => setIsOpenEdit(v)}
          resourceType={resourceType}
        />
      )}
      {resourceType === "cultures" && (
        <EditCultureModal
          resourceType={resourceType}
          isOpen={isOpenEdit}
          setIsOpen={(v) => setIsOpenEdit(v)}
        />
      )}
      {resourceType === "events" && (
        <EditEventModal
          resourceType={resourceType}
          isOpen={isOpenEdit}
          setIsOpen={(v) => setIsOpenEdit(v)}
        />
      )}
    </>
  );
}
