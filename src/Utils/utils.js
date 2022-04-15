// to simulate new command when clicking on the "Make new order"
export const selectRandomItem = (arr = []) => {
  const randomElement = arr[Math.floor(Math.random() * arr.length)];
  return randomElement;
};
