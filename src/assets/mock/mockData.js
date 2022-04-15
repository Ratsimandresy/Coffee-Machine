module.exports = {
  orders: [
    { order1: { drink: "Thé", sugarQuantity: 1, money: 1 } },
    { order2: { drink: "Coca", sugarQuantity: 1, money: 0.6 } },
    { order3: { drink: "Café", sugarQuantity: 6, money: 0.7 } },
    { order4: { drink: "Chocolat", sugarQuantity: 3, money: 0.2 } },
  ],
  commands: [
    { type: "T", sugarQtyCode: ":1:0", message: null, price: 0.4 },
    { type: "C", sugarQtyCode: "::", message: null, price: 0.6 },
    { type: "Ch", sugarQtyCode: ":1:0", message: null, price: 0.6 },
    {
      type: "Th",
      sugarQtyCode: ":6:0",
      message: "M:Maximum sugar allowed !",
      price: 0.4,
    },
    {
      type: "H",
      sugarQtyCode: ":2:0",
      message: "M:Not enough money ! Please provide : 0.2€",
      price: 0.5,
    },
    { type: "Hh", sugarQtyCode: ":3:0", message: null, price: 0.5 },
    { type: "T", sugarQtyCode: "::", message: null, price: 0.4 },
    {
      type: "M",
      sugarQtyCode: "::",
      message: "M:This drink doesn't exist yet !",
      price: null,
    },
    { type: "Ch", sugarQtyCode: ":1:0", message: null, price: 0.6 },
    { type: "H", sugarQtyCode: ":5:0", message: null, price: 0.5 },
  ],
};
