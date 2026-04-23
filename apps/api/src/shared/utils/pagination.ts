export function getSkip(page = 1, pageSize = 20): number {
  return Math.max(page - 1, 0) * pageSize;
}

export function getPaginationMeta(total: number, page = 1, pageSize = 20) {
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);

  return {
    total,
    page,
    pageSize,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
