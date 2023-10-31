import { useEffect, useState } from "react";
import { deleteType, fetchTypes } from "../stores/actions/typeAction";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function TypeRow({ type, idx }) {
  const [newType, setNewType] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    setNewType(type);
  }, []);
  const deleteTypeHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "$d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted", "The type has been deleted", "success");
        dispatch(deleteType(id)).finally(() => {
          dispatch(fetchTypes());
        });
      }
    });
  };
  return (
    <>
      <tr>
        <td scope="row">{idx + 1}</td>
        <td className="fw-bold">{type.name}</td>
        <td>
          {localStorage.getItem("role") === "Admin" ? (
            <>
              <NavLink to={`/edittype/${type.id}`}>
                <button
                  className="btn btn-primary"
                  style={{ marginRight: '10px' }}
                >
                  <span className="icon material-symbols-outlined text-light">
                    Edit
                  </span>
                </button>
              </NavLink>
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  deleteTypeHandler(type.id);
                }}
              >
                <span className="icon material-symbols-outlined text-light">
                  Delete
                </span>
              </button>
            </>
          ) : null}
        </td>
      </tr>
    </>
  );
}
