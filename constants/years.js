export const years = () => {
  const currentYear = new Date().getFullYear();
  const yearRange = [];

  for (let i = 0; i < 10; i++) {
    yearRange.push(currentYear - i);
  }

  return yearRange.map((year) => {
    return {
      val: year.toString(),
      label: year.toString(),
    };
  });
};
