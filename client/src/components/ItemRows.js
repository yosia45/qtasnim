import { useEffect, useState } from "react";
import {
  deleteItem,
  fetchItems,
  editItemStatus,
} from "../stores/actions/itemAction";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function ItemRow({ item, idx }) {
  const [newItem, setNewItem] = useState({});
  const [newStatus, setNewStatus] = useState({
    status: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setNewItem(item);
    setNewStatus(item);
  }, []);

  let bodyToEdit = JSON.stringify({ ...newStatus });
  const editItemStatusHandler = (id) => {
    if(localStorage.getItem("role")==="Client"){
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
          Swal.fire("Deleted", "The item has been deleted", "success");
          dispatch(editItemStatus(bodyToEdit, id)).finally(() => {
            dispatch(fetchItems());
          });
        }
      });
    }else{
      dispatch(editItemStatus(bodyToEdit,id))
      .then(()=>{
        Swal.fire(`You sucessfully change the item status`,"","success")
      })
      .catch((err)=>{
        Swal.fire(`${err}`,"","error")
      })
      .finally(()=>{
        dispatch(fetchItems())
      })
    }
  };
  const changeItemStatusButton = (itemStatus) => {
    if (itemStatus === "active") {
      return (
        <button
          name="status"
          value={(newStatus.status = "inactive")}
          className="btn btn-danger"
          style={{marginRight:'10px'}}
          onClick={(e) => {
            e.preventDefault();
            editItemStatusHandler(item.id);
          }}
        >
          <span className="icon material-symbols-outlined text-light">
            Deactive this item
          </span>
        </button>
      );
    } else if (
      itemStatus === "inactive" &&
      localStorage.getItem("role") === "Admin"
    ) {
      return (
        <button
          name="status"
          value={(newStatus.status = "active")}
          className="btn btn-warning"
          style={{marginRight:'10px'}}
          onClick={(e) => {
            e.preventDefault();
            editItemStatusHandler(item.id);
          }}
        >
          <span className="icon material-symbols-outlined text-light">
            Activate this item
          </span>
        </button>
      );
    }
  };
  const showHardDeleteButton = (role) => {
    if (role === "Admin") {
      return (
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
      );
    }
  };
  const deleteItemHandler = (id) => {
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
        Swal.fire("Deleted", "The item has been deleted", "success");
        dispatch(deleteItem(id)).finally(() => {
          dispatch(fetchItems());
        });
      }
    });
  };
  return (
    <>
      <tr>
        <td scope="row">{idx + 1}</td>
        <td className="fw-bold">{item.name}</td>
        <td className="fw-bold">{item.Type.name}</td>
        <td className="fw-bold">{item.User.username}</td>
        <td>
          <NavLink to={`/items/${item.id}`}>
            <button className="btn btn-success mx-2">
              <span className="icon material-symbols-outlined text-light">
                Details
              </span>
            </button>
          </NavLink>
          {item.userId === +localStorage.getItem("id") ||
          localStorage.getItem("role") === "Admin" ? (
            <>
              <NavLink to={`/edititem/${item.id}`}>
                <button className="btn btn-primary mx-2 ">
                  <span className="icon material-symbols-outlined text-light">
                    Edit
                  </span>
                </button>
              </NavLink>
              {changeItemStatusButton(item.status)}
            </>
          ) : null}
          {showHardDeleteButton(localStorage.getItem("role"))}
        </td>
      </tr>
    </>
  );
}
