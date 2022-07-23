import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import HandshakeIcon from '@mui/icons-material/Handshake';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSelector } from "react-redux";

import "./widget.scss";

const Widget = ({ type }) => {
  const books = useSelector((state) => state.allBooks);
  const copias = useSelector((state) => state.allCopias);
  const lectores = useSelector((state) => state.allLectores);
  const prestamos = useSelector((state) => state.allPrestamos);
  const multas = useSelector((state) => state.allMultas);
  
  let data;

  switch (type) {
    case "libros":
      data = {
        name: "libros",
        title: "LIBROS",
        total: books.length,
        icon: (
          <MenuBookIcon
            className="icon"
            style={{
              color: "white",
              backgroundColor: "rgb(61, 61, 61)",
              width: "40px", height: "40px"
            }}
          />
        ),
      };
      break;
    case "copias":
      data = {
        name: "copias",
        title: "COPIAS",
        total: copias.length,
        icon: (
          <ContentCopyIcon
            className="icon"
            style={{
              color: "white",
              backgroundColor: "rgb(61, 61, 61)",
              width: "40px", height: "40px"
            }}
          />
        ),
      };
      break;
    case "lectores":
      data = {
        name: "lectores",
        title: "LECTORES",
        total: lectores.length,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "white",
              backgroundColor: "rgb(61, 61, 61)",
              width: "40px", height: "40px"
            }}
          />
        ),
      };
      break;
    case "prestamos":
      data = {
        name: "prestamos",
        title: "PRESTAMOS",
        total: prestamos.length,
        icon: (
          <HandshakeIcon
            className="icon"
            style={{ color: "white", backgroundColor: "rgb(61, 61, 61)", width: "40px", height: "40px" }}
          />
        ),
      };
      break;
      case "multas":
        data = {
          name: "multas",
          title: "MULTAS",
          total: multas.length,
          icon: (
            <DoDisturbIcon
              className="icon"
              style={{ color: "white", backgroundColor: "rgb(61, 61, 61)", width: "40px", height: "40px" }}
            />
          ),
        };
        break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.total}
        </span>
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
