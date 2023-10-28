import ItemTable from "../components/ItemTable";
import SideBar from "../components/SideBar";

export default function HompePage() {
  return (
    <div>
      <section className="container-fluid" id="home-section">
        <div className="row">
          <SideBar />
          <ItemTable />
        </div>
      </section>
    </div>
  );
}
