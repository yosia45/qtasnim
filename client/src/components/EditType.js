import {
  editType,
  fetchTypes,
  fetchTypeById,
} from "../stores/actions/typeAction";
import { useParams, useNavigate, NavLink, json } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PulseLoader from "react-spinners/PulseLoader";

export default function EditType() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { typeById } = useSelector((state) => state.type);
  const [newType, setNewType] = useState({
    name: "",
  });
  const [loadingPage, setLoadingPage] = useState(true)
  const changeNewType = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    setNewType({ ...newType, [name]: value });
  };
  useEffect(() => {
    dispatch(fetchTypeById(id))
    .catch((err)=>{
        Swal.fire(`${err}`,"","error")
    })
    .finally(()=>{
        setLoadingPage(false)
    })
  }, []);
  useEffect(() => {
    setNewType(typeById);
  }, [typeById]);

  const editTypeHandler = (id) => {
    dispatch(editType(JSON.stringify(newType), id))
      .then((data) => {
        Swal.fire(`${data}`, "", "success");
      })
      .catch((err) => {
        Swal.fire(`${err}`, "", "error");
      })
      .finally(() => {
        navigate("/types");
        dispatch(fetchTypes());
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
                  editTypeHandler(typeById.id)
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
                    value={newType.name}
                    onChange={changeNewType}
                  />
                </div>
                <div className="row mt-5 mb-3">
                  <div className="col-6">
                    <NavLink
                      to={"/types"}
                      className="btn btn-lg btn-light rounded-pill w-100 p-2"
                      href=""
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
