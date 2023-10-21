import "./App.css";
import router from "./routers";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./stores/index";


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
