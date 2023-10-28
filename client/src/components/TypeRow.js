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
    dispatch(deleteType(id))
      .then((data) => {
        Swal.fire(`${data}`, "", "success");
      })
      .catch((err) => {
        Swal.fire(`${err}`, "", "error");
      })
      .finally(() => {
        dispatch(fetchTypes());
      });
  };
  return (
    <>
      <tr>
        <td scope="row">{idx + 1}</td>
        <td className="fw-bold">{type.name}</td>
        <td>
          <NavLink to={`/edittype/${type.id}`}>
            <button className="btn btn-primary">
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
        </td>
      </tr>
    </>
  );
}
