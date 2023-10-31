import EditItem from "../components/EditItem";
import SideBar from "../components/SideBar";

export default function EditItemPage() {
  return (
    <div>
      <section className="container-fluid" id="home-section">
        <div className="row">
          <SideBar />
          <EditItem />
        </div>
      </section>
    </div>
  );
}
