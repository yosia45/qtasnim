import AddNewItem from "../components/AddNewItem";
import SideBar from "../components/SideBar";

export default function AddNewItemPage() {
  return (
    <div>
      <section className="container-fluid" id="home-section">
        <div className="row">
          <SideBar />
          <AddNewItem />
        </div>
      </section>
    </div>
  );
}
