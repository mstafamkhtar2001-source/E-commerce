// services.js
export const getDailySales = (invoices) => {
    // هنا منطق الحسابات بتاعك (الـ Logic)
    const sales = {};
    invoices.forEach(inv => {
        const date = inv.date; // أو أي حاجة بتعتمد عليها
        sales[date] = (sales[date] || 0) + inv.total;
    });
    return sales;
};