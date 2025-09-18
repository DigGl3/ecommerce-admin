import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string): Promise<number> => {
  const paidOrders = await prismadb.order.findMany({
    where: { storeId, isPaid: true },
    include: {
      orderItems: {
        include: { product: true },
      },
    },
  });

  let totalRevenue = 0;

  for (const order of paidOrders) {
    let orderTotal = 0;
    for (const item of order.orderItems) {
      // presupunem că price este Decimal
      orderTotal += item.product.price.toNumber();
    }
    totalRevenue += orderTotal;
  }

  return totalRevenue;
};
