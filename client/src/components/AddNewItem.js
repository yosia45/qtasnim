import { fetchItems, addItem } from "../stores/actions/itemAction";
import { fetchTypes } from "../stores/actions/typeAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";

export default function AddNewItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { types } = useSelector((state) => state.type);
  const [newItem, setNewItem] = useState({
    name: "",
    typeId: "",
    userId: localStorage.getItem("id")
  });
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchTypes())
      .catch((err) => {
        Swal.fire(`${err}`, "", "error");
      })
      .finally(() => {
        dispatch(fetchItems());
        setLoadingPage(false);
      });
  }, []);
  const changeNewItem = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setNewItem({ ...newItem, [name]: value });
  };
  let bodyToAdd = JSON.stringify({ ...newItem, typeId: +newItem.typeId, userId: +newItem.userId });
  const addNewItem = () => {
    dispatch(addItem(bodyToAdd))
      .then((data) => {
        Swal.fire(`${data}`, "", "success");
        navigate("/");
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
                  addNewItem();
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
                    name="name"
                    value={newItem.name}
                    onChange={changeNewItem}
                  />
                  <label htmlFor="category-name">
                    Item Type <span className="text-danger fw-bold">*</span>
                  </label>
                  <select onChange={changeNewItem} name="typeId">
                    <option disabled selected>
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
                    <NavLink to={"/"}>
                      <button
                        className="btn btn-lg btn-light rounded-pill w-100 p-2"
                        id="cancel-new-category"
                      >
                        Cancel
                      </button>
                    </NavLink>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-lg btn-primary rounded-pill w-100 p-2"
                      type="submit"
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
