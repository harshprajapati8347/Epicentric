import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./redux/store";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
