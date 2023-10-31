import AddNewType from "../components/AddNewType";
import SideBar from "../components/SideBar";

export default function AddNewTypePage() {
  return (
    <div>
      <section className="container-fluid" id="home-section">
        <div className="row">
          <SideBar />
          <AddNewType />
        </div>
      </section>
    </div>
  );
}
