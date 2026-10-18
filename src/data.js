// src/data.js
import { heroBanner, logo, mensImg, womensImg, product1, product2, product3,product4 } from './AppRoutes';

export const products = [
  { id: 1, name: "Classic Blue Shirt", price: "29.99$", image: product1, category: "men" ,details: "اللون: ازرق فاتح \nالمقاس: L \nالخامة: قطن 100%",reviews: "خامة ممتازة \nالمقاس مظبوط \nالخامة: قطن 100%" , Qty: 1, الوصف:"قميص ازرق كلاسيكى ذات طابع استثنائى من القطن ويمتاز بخفه ملمسة ويجعلة مناسب لمعظم فصول السنة  "  },
  { id: 2, name: "Striped Summer Shirt", price: "35.00$", image: product2, category: "men" , Qty: 1, الوصف:"قميص ازرق مخطط من القطن ويمتاز بخفه ملمسة ويجعلة مناسب لمعظم فصول السنة ",details: "اللون: ازرق فاتح \nالمقاس: L \nالخامة: قطن 100%",reviews: "خامة ممتازة \nالمقاس مظبوط \nالخامة: قطن 100%" },
  { id: 3, name: "Linen shirt", price: "40.00$", image: product3, category: "women" ,details: "اللون: الوردى \nالمقاس: L \nالخامة: قطن 100%",reviews: "خامة ممتازة \nالمقاس مظبوط \nالخامة: قطن 100%", Qty: 1, الوصف:"سترة من الكتان الفاخر تمتاز بخفة ملمسها ومناسبة لجميع فصول السنة " },
  { id: 4, name: "Trimmed Dress", price: "90.00$", image: product4, category: "women" ,details: "اللون: الوردى \nالمقاس: L \nالخامة: قطن 100%",reviews: "خامة ممتازة \nالمقاس مظبوط \nالخامة: قطن 100%", Qty: 1, الوصف:"سترة من الكتان الفاخر تمتاز بخفة ملمسها ومناسبة لجميع فصول السنة " }
];
