const cafes = ["Insomnia", "Cafe Nero", "Wall & Keogh", "Brewlabs"];

// Should fetch within a certain radius of the given one
// Means you need to calculate the cafes that will appear in that radius
export const fetchCafesByLocation = async (
  latitude: number,
  longitude: number,
) => {
  return ["Nero", "Plato"];
};

// Allow for an optional limit to be given
// Needs to ensure you understand pagination
export const fetchAllCafes = async (limit?: number) => {
  console.log(`Limit: ${limit}`);
  return limit ? cafes.slice(0, limit) : cafes;
};

export const fetchCafesWithBeansByBrand = async (beanBrand: string) => {
  console.log("Cafe with beans by brand");
  return [
    "Cafe with beans by brand #1",
    "Cafe with beans by name #2",
    "Cafe with beans by name #3",
  ];
};

export const fetchCafesWithBeansByName = async (beanName: string) => {
  console.log("Cafe with beans by name");
  return [
    "Cafe with beans by name #1",
    "Cafe with beans by name #2",
    "Cafe with beans by name #3",
  ];
};
