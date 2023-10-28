import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTypes } from "../stores/actions/typeAction";
import TypeRow from "./TypeRow";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

export default function TypeTable() {
  const dispatch = useDispatch();
  const { types } = useSelector((state) => state.type);

  useEffect(() => {
    dispatch(fetchTypes()).catch((err) => {
      Swal.fire(`${err}`, "", "error");
    });
  }, []);
  return (
    <div>
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="category-section"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2">Types</h1>
          <NavLink to={"/addtype"}>
            <button className="btn btn-primary rounded-pill" id="new-category">
              Add New Type
            </button>
          </NavLink>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Name</th>
                  <th scope="col" width="200px"></th>
                </tr>
              </thead>
              <tbody id="table-category">
                {types.map((type,idx)=>(
                    <TypeRow type={type} key={type.id} idx={idx} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
