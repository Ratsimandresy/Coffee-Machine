module.exports = {
  orders: [
    { drink: "Thé", sugarQuantity: 1, money: 1, extraHot: false },
    { drink: "Coca", sugarQuantity: 1, money: 0.6, extraHot: false },

    { drink: "Café", sugarQuantity: 6, money: 0.7, extraHot: true },

    {
      drink: "Chocolat",
      sugarQuantity: 3,
      money: 0.2,
      extraHot: false,
    },

    {
      drink: "Chocolat",
      sugarQuantity: 6,
      money: 0.2,
      extraHot: true,
    },

    {
      drink: "Chocolat",
      sugarQuantity: 3,
      money: 0.2,
      extraHot: true,
    },

    { drink: "Fanta", sugarQuantity: 0, money: 1, extraHot: false },
    {
      drink: "Orange juice",
      sugarQuantity: 3,
      money: 0.8,
      extraHot: false,
    },

    { drink: "Café", sugarQuantity: 3, money: 0.2, extraHot: true },
    {
      drink: "Orange juice",
      sugarQuantity: 0,
      money: 0.6,
      extraHot: false,
    },

    { drink: "Thé", sugarQuantity: 0, money: 1, extraHot: false },
    { drink: "Café", sugarQuantity: 1, money: 0.6, extraHot: true },

    {
      drink: "Chocolat",
      sugarQuantity: 0,
      money: 0.2,
      extraHot: true,
    },

    { drink: "Thé", sugarQuantity: 2, money: 0.4, extraHot: true },
    { drink: "Orange juice", sugarQuantity: 2, money: 0.8, extraHot: false },
    { drink: "Chocolat", sugarQuantity: 1, money: 0.7, extraHot: false },
    { drink: "Café", sugarQuantity: 0, money: 0.6, extraHot: true },
    { drink: "Thé", sugarQuantity: 4, money: 0.4, extraHot: false },
    { drink: "Orange juice", sugarQuantity: 1, money: 0.6, extraHot: true },
    { drink: "Chocolat", sugarQuantity: 0, money: 2, extraHot: true },
    { drink: "Café", sugarQuantity: 5, money: 5, extraHot: false },
  ],
  commands: [
    {
      type: "T",
      sugarQtyCode: ":1:0",
      message: null,
      price: 0.4,
      isPrepared: true,
    },
    {
      type: "C",
      sugarQtyCode: "::",
      message: null,
      price: 0.6,
      isPrepared: true,
    },
    {
      type: "Ch",
      sugarQtyCode: ":1:0",
      message: null,
      price: 0.6,
      isPrepared: true,
    },
    {
      type: "Th",
      sugarQtyCode: ":6:0",
      message: "M:Maximum sugar allowed !",
      price: 0.4,
      isPrepared: false,
    },
    {
      type: "H",
      sugarQtyCode: ":2:0",
      message: "M:Not enough money ! Please provide : 0.2€",
      price: 0.5,
      isPrepared: false,
    },
    {
      type: "Hh",
      sugarQtyCode: ":3:0",
      message: null,
      price: 0.5,
      isPrepared: true,
    },
    {
      type: "T",
      sugarQtyCode: "::",
      message: null,
      price: 0.4,
      isPrepared: true,
    },
    {
      type: "M",
      sugarQtyCode: "::",
      message: "M:This drink doesn't exist yet !",
      price: null,
      isPrepared: false,
    },
    {
      type: "Ch",
      sugarQtyCode: ":1:0",
      message: null,
      price: 0.6,
      isPrepared: true,
    },
    {
      type: "H",
      sugarQtyCode: ":5:0",
      message: null,
      price: 0.5,
      isPrepared: true,
    },
  ],
};
