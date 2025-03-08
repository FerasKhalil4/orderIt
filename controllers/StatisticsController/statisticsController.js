import CartProducts from "../../models/cartProductsModel.js";
import { fn, Op, col } from "sequelize";
import Product from "../../models/productModel.js";

const MONTHS = {
  Jan: { month: "Jan", totalQuantity: 0 },
  Fab: { month: "Fab", totalQuantity: 0 },
  Mar: { month: "Mar", totalQuantity: 0 },
  Apr: { month: "Apr", totalQuantity: 0 },
  May: { month: "May", totalQuantity: 0 },
  Jun: { month: "Jun", totalQuantity: 0 },
  Jul: { month: "Jul", totalQuantity: 0 },
  Aug: { month: "Aug", totalQuantity: 0 },
  Sep: { month: "Sep", totalQuantity: 0 },
  Oct: { month: "Oct", totalQuantity: 0 },
  Nov: { month: "Nov", totalQuantity: 0 },
  Dec: { month: "Dec", totalQuantity: 0 },
};

const getStatistics = async (req, res) => {
  const productsPurchased = await getCurrentYearProducts();
  console.log(productsPurchased);
  const returnedData = {
    ...MONTHS,
    ...productsPurchased,
  };
  const arr = Object.values(returnedData);
  console.log(arr);
  return res.json(arr);
};

const getCurrentYearProducts = async () => {
  const nowYear = new Date().getFullYear();
  const startDate = new Date(nowYear, 0, 1);
  const endDate = new Date(nowYear + 1, 0, 1);

  const dateCondition = {
    [Op.gte]: startDate,
    [Op.lt]: endDate,
  };

  const productsByCurrentYear = await CartProducts.findAll({
    where: {
      createdAt: dateCondition,
    },
    include: [
      {
        model: Product,
        attributes: ["name", "price"],
        as: "ProductDetails",
      },
    ],

    attributes: [
      [fn("strftime", "%m", col("CartProducts.createdAt")), "month"],
      [fn("SUM", col("quantity")), "totalQuantity"],
    ],
    group: ["month", "productId"],
  });

  formatMonths(productsByCurrentYear);
  return getMaxProductQuantityPerMonth(productsByCurrentYear);
};

const getMaxProductQuantityPerMonth = (products) => {
  const stats = {};

  products.map(({ dataValues: item }) => {
    const { month, totalQuantity } = item;
    const searchedProductIndex = stats[month];

    if (searchedProductIndex) {
      const prevValueProductQuantity = stats[month].totalQuantity;

      if (prevValueProductQuantity < totalQuantity) {
        stats[month] = item;
      }
    } else {
      stats[month] = item;
    }
  });
  return stats;
};

const formatMonths = (months) => {
  months.map((product) => {
    const monthNumber = parseInt(product.dataValues.month, 10);
    product.dataValues.month = Object.values(MONTHS)[monthNumber - 1].month;
  });
};

export { getStatistics };
