import { useEffect, useState } from "react";
import { deleteItem, fetchItems } from "../stores/actions/itemAction";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function ItemRow({ item, idx }) {
  const [newItem, setNewItem] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    setNewItem(item);
  }, []);
  const deleteItemHandler = (id) => {
    dispatch(deleteItem(id))
      .then((data) => {
        Swal.fire(`${data}`, "", "success");
      })
      .catch((err) => {
        Swal.fire(`${err}`, "", "error");
      })
      .finally(() => {
        dispatch(fetchItems());
      });
  };
  return (
    <>
      <tr>
        <td scope="row">{idx + 1}</td>
        <td className="fw-bold">{item.name}</td>
        <td className="fw-bold">{item.Type.name}</td>
        <td>
          <NavLink to={`/items/${item.id}`}>
            <button className="btn btn-success">
              <span className="icon material-symbols-outlined text-light">
                Details
              </span>
            </button>
          </NavLink>
          <NavLink to={`/edititem/${item.id}`}>
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
              deleteItemHandler(item.id);
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
