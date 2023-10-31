import { addBuyStock } from "../stores/actions/detailAction";
import { fetchItemById } from "../stores/actions/itemAction";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export default function AddStockBuying() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [newDetail, setNewDetail] = useState({
    transactionDate: "",
    stockBuying: "",
    itemId: id,
  });
  const changeNewDetail = (e) => {
    const { value } = e.target;
    const { name } = e.target;
    setNewDetail({ ...newDetail, [name]: value });
  };
  let bodyToAdd = JSON.stringify({ ...newDetail, itemId: +newDetail.itemId });
  const addNewStockBuying = () => {
    dispatch(addBuyStock(bodyToAdd))
      .then((data) => {
        Swal.fire(`Success to buy this item`, "", "success");
        navigate(`/items/${id}`);
      })
      .catch((err) => {
        Swal.fire(`${err}`, "", "error");
      })
      .finally(() => {
        dispatch(fetchItemById(id));
      });
  };
  return (
    <div>
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="new-category-section"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2">Add Stock</h1>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <form
              id="category-form"
              onSubmit={(e) => {
                e.preventDefault();
                addNewStockBuying();
              }}
            >
              <div className="mb-3">
                <label htmlFor="category-name">
                  Total Stock Buying <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="category-name"
                  placeholder="Enter total stock"
                  name="stockBuying"
                  required
                  value={newDetail.stockBuying}
                  onChange={changeNewDetail}
                />
                <label htmlFor="category-name">
                  Date <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="category-name"
                  name="transactionDate"
                  required
                  value={newDetail.transactionDate}
                  onChange={changeNewDetail}
                />
              </div>
              <div className="row mt-5 mb-3">
                <div className="col-6">
                  <NavLink
                    to={`/items/${id}`}
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
    </div>
  );
}
