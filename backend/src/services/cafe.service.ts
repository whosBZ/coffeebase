const cafes = ["Insomnia", "Cafe Nero", "Wall & Keogh", "Brewlabs"];

export const fetchCafesByLocation = async (
  latitude: number,
  longitude: number,
) => {
  return ["Nero", "Plato"];
};

export const fetchAllCafes = async (limit?: number) => {
  console.log(`Limit: ${limit}`);
  return limit ? cafes.slice(0, limit) : cafes;
};
