import { fetchTypes, addType } from "../stores/actions/typeAction";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddNewType() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newType, setNewType] = useState({
    name: "",
  });
  const changeNewType = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setNewType({ ...newType, [name]: value });
  };
  let bodyToAdd = JSON.stringify({ ...newType });
  const addNewTypeHandler = () => {
    dispatch(addType(bodyToAdd))
      .then((data) => {
        Swal.fire(`${data}`, "", "success");
        navigate(`/types`);
      })
      .catch((err) => {
        // console.log(err)
        Swal.fire(`${err}`, "", "error");
      })
      .finally(() => {
        dispatch(fetchTypes());
      });
  };
  return (
    <section
      className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
      id="new-category-section"
    >
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="display-2">New Type</h1>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <form
            id="category-form"
            onSubmit={(e) => {
              e.preventDefault();
              addNewTypeHandler();
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
                placeholder="Enter type name"
                name="name"
                required
                value={newType.name}
                onChange={changeNewType}
              />
            </div>
            <div className="row mt-5 mb-3">
              <div className="col-6">
                <NavLink
                  to={"/types"}
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
  );
}
