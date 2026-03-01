export const parsePagination = (page?: string, limit?: string): { page: number; limit: number; skip: number } => {
  const parsedPage = Number(page) > 0 ? Number(page) : 1;
  const parsedLimit = Number(limit) > 0 ? Math.min(Number(limit), 100) : 10;
  return { page: parsedPage, limit: parsedLimit, skip: (parsedPage - 1) * parsedLimit };
};
