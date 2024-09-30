"use client"; // Bu satırı ekleyerek bileşenin client-side'da çalışacağını belirtiyoruz

import { useState } from 'react';
import { FaHome, FaUsers, FaCog, FaBars } from 'react-icons/fa';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <ul>
          <li>
            <FaHome />
            <a href="/admin">Dashboard</a>
          </li>
          <li>
            <FaUsers />
            <a href="/admin/users">Users</a>
          </li>
          <li>
            <FaCog />
            <a href="/admin/settings">Settings</a>
          </li>
        </ul>
      </aside>

      {/* Mobile Navbar with Hamburger Menu */}
      <nav className="navbar">
        <FaBars className="hamburger-menu" onClick={toggleMenu} />
        <span>Admin Panel</span>
      </nav>

      {/* Collapsible Sidebar for mobile */}
      {isOpen && (
        <aside className="sidebar">
          <ul>
            <li>
              <FaHome />
              <a href="/admin">Dashboard</a>
            </li>
            <li>
              <FaUsers />
              <a href="/admin/users">Users</a>
            </li>
            <li>
              <FaCog />
              <a href="/admin/settings">Settings</a>
            </li>
          </ul>
        </aside>
      )}
    </>
  );
}
