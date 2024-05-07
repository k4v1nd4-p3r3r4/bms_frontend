import React, { useEffect, useState } from "react";
import axios from "axios";
import "./navNotice.css"; // Import CSS file

function NavNotice() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/notify/notifications"
      );
      // Sort the notifications array by timestamp in descending order
      const sortedNotifications = response.data.notifications.sort((a, b) =>
        a.timestamp > b.timestamp ? -1 : 1
      );
      setNotifications(sortedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleCloseNotification = async (materialId, index) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/notify/notifications/${materialId}`
      );
      const updatedNotifications = [...notifications];
      updatedNotifications.splice(index, 1);
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <li className="header-nav nav-item dropdown">
      {" "}
      {/* Add class "header-nav" */}
      <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
        <i className="bi bi-bell"></i>
        <span className="badge bg-danger badge">{notifications.length}</span>
      </a>
      <ul className="dropdown-menu dropdown-menu end dropdown-menu-arrow notifications">
        <li className="dropdown-header">
          You have {notifications.length} new notifications
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">
            <i
              className="bi bi-x-circle text-danger"
              onClick={() =>
                handleCloseNotification(notification.material_id, index)
              }
              style={{ cursor: "pointer" }}
            ></i>
            <div>
              <h4>{notification.material_name}</h4>
              <p>{notification.message}</p>
              <p>{notification.timestamp}</p>
            </div>
          </li>
        ))}

        <li>
          <hr className="dropdown-divider" />
        </li>
      </ul>
    </li>
  );
}

export default NavNotice;
