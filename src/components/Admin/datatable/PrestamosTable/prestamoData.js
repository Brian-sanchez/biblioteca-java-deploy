export const prestamosColumns = [
  { field: "id", headerName: "ID", width: 20 },
  {
    field: "lector",
    headerName: "Lector",
    width: 120,
    valueFormatter: (params) => params.value.nombre
  },
  {
    field: "libro",
    headerName: "Libro",
    width: 180,
    valueFormatter: (params) => params.value.titulo
  },
  {
    field: "inicio",
    headerName: "Inicio",
    width: 110,
  },
  {
    field: "fin",
    headerName: "Fin",
    width: 110,
  },
  {
    field: "copia",
    headerName: "Copia",
    width: 190,
    valueFormatter: (params) => `ID: ${params.value.id} - Estado: ${params.value.estado}`,
  }
];