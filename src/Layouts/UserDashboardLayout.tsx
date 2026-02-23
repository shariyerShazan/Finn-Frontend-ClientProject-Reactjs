import { Outlet } from "react-router-dom";

function UserDashboardLayout() {
  return (
    <div>
      UserDashboardLayout
      {/* sidebar */}
      <div className="sidebar">
        <ul>
          <li>
            <a href="/user-profile">Profile</a>
          </li>
          <li>
            <a href="/user/dashboard/chat">Chatbox</a>
          </li>
          <li>
            <a href="/change-password">Change Password</a>
          </li>
        </ul>
      </div>
      {/* main content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default UserDashboardLayout;
