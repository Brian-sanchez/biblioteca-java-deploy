export const librosColumns = [
  { field: "id", headerName: "ID", width: 20 },
  {
    field: "image",
    headerName: "Portada",
    width: 90,
    renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="avatar" />
          </div>
        );
      },
  },
  {
    field: "titulo",
    headerName: "Titulo",
    width: 180,
  },
  {
    field: "tipoLibro",
    headerName: "Tipo",
    width: 80,
  },
  {
    field: "editorial",
    headerName: "Editorial",
    width: 122,
  },
  {
    field: "autor",
    headerName: "Autor",
    width: 82,
  },
  {
    field: "autorNacionalidad",
    headerName: "Nacionalidad",
    width: 110,
  },
  {
    field: "autorNacimiento",
    headerName: "Nacimiento",
    width: 110,
  }
];
