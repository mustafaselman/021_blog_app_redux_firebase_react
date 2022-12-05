import AppRouter from "./router/AppRouter";
import UserProvider from "./context/AuthContext";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./app/store";


function App()
{
  return (
    <div >
      <Provider store={store}>
        <ToastContainer />
        <UserProvider>
          <AppRouter />
        </UserProvider>
      </Provider>

    </div>
  );
}

export default App;
