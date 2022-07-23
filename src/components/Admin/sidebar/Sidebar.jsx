import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import HandshakeIcon from '@mui/icons-material/Handshake';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HomeIcon from '@mui/icons-material/Home';

import { FaBook } from 'react-icons/fa';

import "./sidebar.scss";

const Sidebar = () => {
  const scrollToUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }} onClick={scrollToUp}>
          <span className="logo"> <FaBook/> Admin</span>
        </Link>
      </div>
      
      <hr />

      <div className="center">
        <ul>
          <Link to="/admin" style={{ textDecoration: "none" }} onClick={scrollToUp}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <Link to="/admin/lectores" style={{ textDecoration: "none" }} onClick={scrollToUp}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Lectores</span>
            </li>
          </Link>

          <Link to="/admin/libros" style={{ textDecoration: "none" }} onClick={scrollToUp}>
            <li>
              <MenuBookIcon className="icon" />
              <span>Libros</span>
            </li>
          </Link>

          <Link to="/admin/copias" style={{ textDecoration: "none" }} onClick={scrollToUp}> 
            <li>
              <ContentCopyIcon className="icon" />
              <span>Copias</span>
            </li>
          </Link>
          
          <Link to="/admin/prestamos" style={{ textDecoration: "none" }} onClick={scrollToUp}>
            <li>
              <HandshakeIcon className="icon" />
              <span>Prestamos</span>
            </li>
          </Link>

          <Link to="/admin/multas" style={{ textDecoration: "none" }} onClick={scrollToUp}>
            <li>
              <DoDisturbIcon className="icon" />
              <span>Multas</span>
            </li>
          </Link>

          <Link to="/" style={{ textDecoration: "none" }} onClick={scrollToUp}> 
            <li>
              <HomeIcon className="icon" />
              <span>Biblioteca</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
