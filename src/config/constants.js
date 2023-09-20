const rolesArray = ["member", "seller"];
const RolesEnum = {
  Member: "member",
  Seller: "seller",
};

const productTypesArray = ["pie", "cake"];
const ProductTypesEnum = {
  Pie: "pie",
  Cake: "cake",
};

const orderStatesArray = ["pending", "accepted", "rejected", "fulfilled"];
const OrderStatesEnum = {
  Pending: "pending",
  Accepted: "accepted",
  Rejected: "rejected",
  Fulfilled: "fulfilled",
};

module.exports = {
  RolesEnum,
  rolesArray,
  productTypesArray,
  ProductTypesEnum,
  orderStatesArray,
  OrderStatesEnum,
};
