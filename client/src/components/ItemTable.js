import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import ItemRows from "./ItemRows";
import { fetchItems } from "../stores/actions/itemAction";
import PulseLoader from "react-spinners/PulseLoader";

export default function ItemTable() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.item);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    dispatch(fetchItems())
      .then((data) => {
        setLoadingPage(false);
      })
      .catch((err) => {
        Swal.fire(`${err}`, "", "error");
      });
  }, []);
  return (
    <div>
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="product-section"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2">Items</h1>
          <NavLink to={"/additem"}>
            <button className="btn btn-primary rounded-pill" id="new-product">
              <span className="icon material-symbols-outlined"></span>Add New
              Item
            </button>
          </NavLink>
        </div>
        <div className="row">
          <div className="col-12 table-responsive">
            {loadingPage ? (
              <PulseLoader color="#ffffff" size={10} />
            ) : (
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col" width="240px"></th>
                  </tr>
                </thead>
                <tbody id="table-product">
                  {items.map((item, idx) => (
                    <ItemRows item={item} key={item.id} idx={idx} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
