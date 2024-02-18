import { useEffect, useRef, useState } from "react";
import axios from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default function ({ isOpen, setIsOpen, resource }) {
  const { id } = useParams();
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const dialogRef = useRef();
  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    <>
      <dialog ref={dialogRef}>
        <div className="close-modal-btn">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className="main-modal">
          {msg && <div>
            <h4>{msg}</h4>
            <p>Redirecting Home...</p>
          </div>}
          {!msg && (
            <>
              <h2>Are you sure?</h2>
              <div>
                If you continue, this resource will be permanently deleted.
              </div>
              <div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    axios
                      .delete(`${VITE_API_URL}/${resource}/${id}`)
                      .then((res) => {
                        setMsg("Resource deleted successfully");
                      })
                      .catch((err) => {
                        console.error(err);
                        setError(true);
                      })
                      .finally(() => {
                        setTimeout(() => navigate("/"), 3000);
                      });
                  }}
                  className="delete-btn"
                >
                  Continue
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
