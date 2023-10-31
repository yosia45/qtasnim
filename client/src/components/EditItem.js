import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  editItem,
  fetchItemById,
  fetchItems,
} from "../stores/actions/itemAction";
import { fetchTypes } from "../stores/actions/typeAction";
import Swal from "sweetalert2";
import { useNavigate, NavLink } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

export default function EditItem() {
  const nagivate = useNavigate();
  const [loadingPage, setLoadingPage] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { itemById } = useSelector((state) => state.item);
  const { types } = useSelector((state) => state.type);
  const [newItem, setNewItem] = useState({
    name: "",
    typeId: "",
  });
  const changeEditItem = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setNewItem({ ...newItem, [name]: value });
  };
  useEffect(() => {
    dispatch(fetchTypes())
    dispatch(fetchItemById(id))
    .catch((err) => {
        Swal.fire(`${err}`, "", "error");
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, []);
  useEffect(() => {
    setNewItem(itemById);
  }, [itemById]);
  let bodyToEdit = JSON.stringify({ ...newItem, typeId: +newItem.typeId });
  const editItemHandler = (id) => {
    dispatch(editItem(bodyToEdit, id))
      .then((data) => {
        Swal.fire(`${data}`, "", "success");
        nagivate("/");
      })
      .catch((err) => {
        Swal.fire(`${err}`, "", "error");
      })
      .finally(() => {
        dispatch(fetchItems());
      });
  };
  return (
    <div>
      {loadingPage ? (
        <PulseLoader color="#ffffff" size={10} />
      ) : (
        <section
          className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
          id="new-category-section"
        >
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="display-2">New Item</h1>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <form
                id="category-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  editItemHandler(newItem.id);
                }}
              >
                <div className="mb-3">
                  <label htmlFor="category-name">
                    Name <span className="text-danger fw-bold">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="category-name"
                    placeholder="Enter item name"
                    required
                    name="name"
                    value={newItem.name}
                    onChange={changeEditItem}
                  />
                  <label htmlFor="category-name">
                    Item Type <span className="text-danger fw-bold">*</span>
                  </label>
                  <select
                    onChange={changeEditItem}
                    name="typeId"
                    defaultValue={newItem.typeId}
                    required
                  >
                    <option value="" disabled selected>
                      Type
                    </option>
                    {types.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row mt-5 mb-3">
                  <div className="col-6">
                    <NavLink
                      to={"/"}
                      className="btn btn-lg btn-light rounded-pill w-100 p-2"
                      id="cancel-new-category"
                    >
                      Cancel
                    </NavLink>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                      type="submit"
                      href=""
                      id="btn-submit-new-category"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
