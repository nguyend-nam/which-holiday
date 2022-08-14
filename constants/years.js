export const years = () => {
  const lastYear = new Date().getFullYear() - 1;
  const yearRange = [];

  for (let i = 0; i < 10; i++) {
    yearRange.push(lastYear - i);
  }

  return yearRange.map((year) => {
    return {
      val: year.toString(),
      label: year.toString(),
    };
  });
};
