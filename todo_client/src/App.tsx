import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import HistoryPage from "./pages/history";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/history",
      element: <HistoryPage />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
