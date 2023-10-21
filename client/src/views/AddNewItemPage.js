import AddNewItem from "../components/AddNewItem";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

export default function AddNewItemPage() {
  return (
    <div>
      <section className="container-fluid" id="home-section">
        <div className="row">
          <NavBar />
          <SideBar />
          <AddNewItem />
        </div>
      </section>
    </div>
  );
}
