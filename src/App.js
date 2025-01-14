import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./components/Browse";
import Login from "./components/Login";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <Body />
      </Provider>
    </div>
  );
};

export default App;
