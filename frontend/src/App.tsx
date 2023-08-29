import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Public from "./utils/public";
import Secure from "./utils/secure";
import AdminHome from "./pages/Admin/Home";
import AdminReports from "./pages/Admin/Reports";
import AdminHotel from "./pages/Admin/Hotel";
import AdminRestaurant from "./pages/Admin/Restaurant";
import AdminInventory from "./pages/Admin/Inventory";
import StaffManagement from "./pages/Admin/Staff";
import AdminSettings from "./pages/Admin/Settings";
import MobileOptions from "./pages/Admin/MobileOptions";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Public>
                <Login />
              </Public>
            }
            path="/login"
          />
          <Route
            element={
              <Secure>
                <AdminHome />
              </Secure>
            }
            path="/admin"
          />
          <Route
            element={
              <Secure>
                <AdminReports />
              </Secure>
            }
            path="/admin/reports"
          />
          <Route
            element={
              <Secure>
                <AdminHotel />
              </Secure>
            }
            path="/admin/hotel"
          />
          <Route
            element={
              <Secure>
                <AdminRestaurant />
              </Secure>
            }
            path="/admin/restaurant"
          />
          <Route
            element={
              <Secure>
                <AdminInventory />
              </Secure>
            }
            path="/admin/inventory"
          />
          <Route
            element={
              <Secure>
                <StaffManagement />
              </Secure>
            }
            path="/admin/staff"
          />
          <Route
            element={
              <Secure>
                <AdminSettings />
              </Secure>
            }
            path="/admin/settings"
          />
          <Route
            element={
              <Secure>
                <MobileOptions />
              </Secure>
            }
            path="/admin/options"
          />
          <Route
            element={
              <Public>
                <Homepage />
              </Public>
            }
            path="/"
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
