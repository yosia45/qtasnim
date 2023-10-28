
import SideBar from "../components/SideBar";
import DetailTable1 from "../components/DetailTable1";

export default function ItemDetailPage() {
  return (
    <div>
      <section className="container-fluid" id="home-section">
        <div className="row">
          <SideBar />
          <DetailTable1 />
        </div>
      </section>
    </div>
  );
}
