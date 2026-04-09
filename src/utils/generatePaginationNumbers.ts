export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // s el numero total de páginas es 7 o más, vamos a motrar todas las páginas sin ""...""
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // si la página actual está entre las primeras 3 páginas, mostrarlas, "..." y las ultimas 2
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // si la página actual esta entre las últimas 3 nostras las primeras 2, "...", y las ultimas 3
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // si la página actual está entre otro lugar medio mostrar la primera página, "...", la página actual y vecinos
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};
