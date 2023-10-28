import SideBar from "../components/SideBar";
import TypeTable from "../components/TypeTable";

export default function TypePage() {
  return (
    <div>
      <section className="container-fluid" id="home-section">
        <div className="row">
          <SideBar />
          <TypeTable />
        </div>
      </section>
    </div>
  );
}
