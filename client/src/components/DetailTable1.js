import { Table, Input, Button } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { fetchItemById } from "../stores/actions/itemAction";
import PulseLoader from "react-spinners/PulseLoader";

export default function DetailTable1() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { itemById } = useSelector((state) => state.item);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    dispatch(fetchItemById(id))
      .catch((err) => {
        Swal.fire(`${err}`, "", "error");
      })
      .finally(() => {
        setLoadingPage(false);
      });
  }, []);
  const data = itemById.Details;
  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Adding Stock",
          value: "Adding Stock",
        },
        {
          text: "Stock Buying",
          value: "Stock Buying",
        },
      ],
      onFilter: (value, record) => record.status === value,
      filterMultiple: false,
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      sorter: (a, b) =>
        new Date(a.transactionDate) - new Date(b.transactionDate),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Start Date"
            type="date"
            value={selectedKeys[0]?.date ?? undefined}
            onChange={(e) =>
              setSelectedKeys([
                { date: e.target.value, type: "start" },
                selectedKeys[1],
              ])
            }
            style={{ marginBottom: 8, display: "block" }}
          />
          <Input
            placeholder="End Date"
            type="date"
            value={selectedKeys[1]?.date ?? undefined}
            onChange={(e) =>
              setSelectedKeys([
                selectedKeys[0],
                { date: e.target.value, type: "end" },
              ])
            }
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => {
              confirm();
            }}
            // icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      onFilter: (value, record) => {
        const start = new Date(value.date).setHours(0, 0, 0, 0);
        const recordDate = new Date(record.transactionDate).setHours(
          0,
          0,
          0,
          0
        );
        if (value.type === "start") {
          return recordDate >= start;
        } else {
          return record <= start;
        }
      },
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString("en-GB");
      },
    },
    {
      title: "Initial Stock",
      dataIndex: "initialStock",
    },
    {
      title: "Amount of Stock Addition",
      dataIndex: "stockAddition",
      sorter: (a, b) => a.stockAddition - b.stockAddition,
    },
    {
      title: "Amount of Stock Buying",
      dataIndex: "stockBuying",
      sorter: (a, b) => a.stockBuying - b.stockBuying,
    },
    {
      title: "Current Available Stock",
      dataIndex: "currentStock",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div>
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="product-section"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2">Item Details</h1>
          <div className="d-flex">
            {(+localStorage.getItem("id") === itemById.userId &&
              localStorage.getItem("role") === "Client") ||
            localStorage.getItem("role") === "Admin" ? (
              <NavLink to={`/addstock/${id}`}>
                <button
                  className="btn btn-primary rounded-pill"
                  id="new-product"
                  style={{marginRight:'10px'}}
                >
                  <span className="icon material-symbols-outlined">
                    Add Stock
                  </span>
                </button>
              </NavLink>
            ) : null}
            <NavLink to={`/addbuying/${id}`}>
              <button className="btn btn-warning rounded-pill" id="new-product">
                <span className="icon material-symbols-outlined">Buy Item</span>
              </button>
            </NavLink>
          </div>
        </div>
        <div className="row">
          <div className="col-12 table-responsive"></div>
          {loadingPage ? (
            <PulseLoader color="#ffffff" size={10} />
          ) : (
            <Table columns={columns} dataSource={data} onChange={onChange} />
          )}
        </div>
      </section>
    </div>
  );
}
