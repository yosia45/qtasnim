import AddNewType from "../components/AddNewType";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

export default function AddNewTypePage() {
  return (
    <div>
      <section className="container-fluid" id="home-section">
        <div className="row">
          <NavBar />
          <SideBar />
          <AddNewType />
        </div>
      </section>
    </div>
  );
}
