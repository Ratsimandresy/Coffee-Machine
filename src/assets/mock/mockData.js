module.exports = {
  orders: [
    { order1: { drink: "Thé", sugarQuantity: 1, money: 1 } },
    { order2: { drink: "Coca", sugarQuantity: 1, money: 0.6 } },
    { order3: { drink: "Café", sugarQuantity: 6, money: 0.7 } },
    { order4: { drink: "Chocolat", sugarQuantity: 3, money: 0.2 } },
  ],
  commands: {
    command1: { type: "T", sugarQtyCode: ":1:0", message: "" },
    command2: { type: "C", sugarQtyCode: "::", message: "" },
    command3: {
      type: "M",
      sugarQtyCode: "::",
      message: "M:This drink doesn't exist yet !",
    },
  },
};
