export const ensureStartingSlash = (path: string): string => {
  return path.startsWith('/') ? path : `/${path}`;
};
