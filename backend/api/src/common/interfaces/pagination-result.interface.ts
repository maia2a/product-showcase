export interface PaginationResult<T> {
  data: T[]; // Os dados paginados
  meta: {
    totalItems: number; // Número total de itens em todas as páginas
    itemsPerPage: number; // Número de itens por página
    totalPages: number; // Número total de páginas
    currentPage: number; // Número da página atual
  };
}
