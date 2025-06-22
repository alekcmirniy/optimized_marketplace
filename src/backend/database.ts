class Product {
    id:number;
    model:string;
    brend: string;
    price: number;
    categories: Object;

    constructor(id: number, model: string, brend: string, price: number, categories: {mainCategory: string, otherCategories: Array<string>}) {
        this.id = id;
        this.model = model;
        this.brend = brend;
        this.price = price;
        this.categories = categories;
    }
}

const ProductDatabase: Array<Product> = [
    new Product(1, "Adizero Select II", "Adidas", 12500, { mainCategory: "Кроссовки", otherCategories: ["Обувь", "Лето"] }),
    new Product(2, "Air Max 90", "Nike", 14500, { mainCategory: "Кроссовки", otherCategories: ["Спорт", "Лето"] }),
    new Product(3, "Classic Leather", "Reebok", 9800, { mainCategory: "Кроссовки", otherCategories: ["Обувь", "Весна"] }),
    new Product(4, "Old Skool", "Vans", 8700, { mainCategory: "Кеды", otherCategories: ["Уличный стиль", "Весна"] }),
    new Product(5, "Chuck Taylor All Star", "Converse", 9100, { mainCategory: "Кеды", otherCategories: ["Лето", "Город"] }),
    new Product(6, "Ultraboost 22", "Adidas", 15700, { mainCategory: "Кроссовки", otherCategories: ["Бег", "Тренировки"] }),
    new Product(7, "Gel-Kayano 29", "ASICS", 13800, { mainCategory: "Кроссовки", otherCategories: ["Бег", "Зима"] }),
    new Product(8, "FuelCell Rebel", "New Balance", 12500, { mainCategory: "Кроссовки", otherCategories: ["Фитнес", "Лето"] }),
    new Product(9, "Zoom Fly 5", "Nike", 15200, { mainCategory: "Кроссовки", otherCategories: ["Спорт", "Фитнес"] }),
    new Product(10, "Blazer Mid '77", "Nike", 11200, { mainCategory: "Кеды", otherCategories: ["Город", "Осень"] }),
    new Product(11, "Superstar", "Adidas", 10500, { mainCategory: "Кроссовки", otherCategories: ["Универсальные", "Весна"] }),
    new Product(12, "Court Vision Low", "Nike", 9500, { mainCategory: "Кеды", otherCategories: ["Город", "Весна"] }),
    new Product(13, "Club C 85", "Reebok", 8700, { mainCategory: "Кеды", otherCategories: ["Стрит", "Весна"] }),
    new Product(14, "Era", "Vans", 8200, { mainCategory: "Кеды", otherCategories: ["Универсальные", "Лето"] }),
    new Product(15, "574", "New Balance", 11900, { mainCategory: "Кроссовки", otherCategories: ["Город", "Весна"] }),
    new Product(16, "Sk8-Hi", "Vans", 9300, { mainCategory: "Кеды", otherCategories: ["Уличный стиль", "Осень"] }),
    new Product(17, "Stan Smith", "Adidas", 10200, { mainCategory: "Кроссовки", otherCategories: ["Город", "Лето"] }),
    new Product(18, "React Infinity Run", "Nike", 14800, { mainCategory: "Кроссовки", otherCategories: ["Бег", "Фитнес"] }),
    new Product(19, "Nano X2", "Reebok", 13400, { mainCategory: "Кроссовки", otherCategories: ["Тренировки", "Зал"] }),
    new Product(20, "Zoom Freak 4", "Nike", 14200, { mainCategory: "Кроссовки", otherCategories: ["Баскетбол", "Спорт"] }),
    new Product(21, "Kamanda", "Adidas", 10800, { mainCategory: "Кроссовки", otherCategories: ["Лимитированная серия", "Уличный стиль"] }),
    new Product(22, "Daytona DMX", "Reebok", 11500, { mainCategory: "Кроссовки", otherCategories: ["Ретро", "Город"] }),
    new Product(23, "Pegasus Trail 4", "Nike", 13900, { mainCategory: "Кроссовки", otherCategories: ["Треккинг", "Природа"] }),
    new Product(24, "Continental 80", "Adidas", 9200, { mainCategory: "Кеды", otherCategories: ["Город", "Ретро"] }),
    new Product(25, "ZoomX Vaporfly", "Nike", 19700, { mainCategory: "Кроссовки", otherCategories: ["Марафон", "Про"] }),
    new Product(26, "All Court", "Puma", 8400, { mainCategory: "Кеды", otherCategories: ["Лето", "Универсальные"] }),
    new Product(27, "Cell Dome", "Puma", 9100, { mainCategory: "Кроссовки", otherCategories: ["Ретро", "Универсальные"] }),
    new Product(28, "Disruptor II", "Fila", 7800, { mainCategory: "Кроссовки", otherCategories: ["Город", "Массивные"] }),
    new Product(29, "MX-720", "Nike", 16200, { mainCategory: "Кроссовки", otherCategories: ["Футуризм", "Город"] }),
    new Product(30, "Zig Kinetica", "Reebok", 9900, { mainCategory: "Кроссовки", otherCategories: ["Технологии", "Уличный стиль"] }),
    new Product(31, "Torsion TRDC", "Adidas", 11800, { mainCategory: "Кроссовки", otherCategories: ["Треккинг", "Осень"] }),
    new Product(32, "IGNITE Limitless", "Puma", 10800, { mainCategory: "Кроссовки", otherCategories: ["Фитнес", "Город"] }),
    new Product(33, "Wave Rider 25", "Mizuno", 13500, { mainCategory: "Кроссовки", otherCategories: ["Бег", "Про"] }),
    new Product(34, "Speedcross 5", "Salomon", 12800, { mainCategory: "Кроссовки", otherCategories: ["Треккинг", "Природа"] }),
    new Product(35, "XT-6", "Salomon", 14700, { mainCategory: "Кроссовки", otherCategories: ["Универсальные", "Стиль"] }),
    new Product(36, "GT-1000 11", "ASICS", 11200, { mainCategory: "Кроссовки", otherCategories: ["Бег", "Зал"] }),
    new Product(37, "All Star Lift", "Converse", 9500, { mainCategory: "Кеды", otherCategories: ["Платформа", "Лето"] }),
    new Product(38, "RS-X", "Puma", 10900, { mainCategory: "Кроссовки", otherCategories: ["Город", "Стиль"] }),
    new Product(39, "Yeezy Boost 350", "Adidas", 24500, { mainCategory: "Кроссовки", otherCategories: ["Премиум", "Стрит"] }),
    new Product(40, "Jordan 1 Mid", "Nike", 18700, { mainCategory: "Кроссовки", otherCategories: ["Баскетбол", "Икона"] }),
    new Product(41, "Forum Low", "Adidas", 10200, { mainCategory: "Кеды", otherCategories: ["Классика", "Город"] }),
    new Product(42, "Classic Nylon", "Reebok", 8100, { mainCategory: "Кроссовки", otherCategories: ["Ретро", "Повседневные"] }),
    new Product(43, "Zoom Winflo 9", "Nike", 12200, { mainCategory: "Кроссовки", otherCategories: ["Фитнес", "Бег"] }),
    new Product(44, "Pacer Future", "Puma", 8900, { mainCategory: "Кроссовки", otherCategories: ["Универсальные", "Город"] }),
    new Product(45, "Trail Glove 6", "Merrell", 9700, { mainCategory: "Кроссовки", otherCategories: ["Природа", "Минимализм"] }),
    new Product(46, "Bare Access XTR", "Merrell", 10200, { mainCategory: "Кроссовки", otherCategories: ["Треккинг", "Фитнес"] }),
    new Product(47, "Fresh Foam Roav", "New Balance", 11300, { mainCategory: "Кроссовки", otherCategories: ["Бег", "Зал"] }),
    new Product(48, "Cloud X", "On Running", 15300, { mainCategory: "Кроссовки", otherCategories: ["Фитнес", "Про"] }),
    new Product(49, "Zoom Structure 24", "Nike", 13900, { mainCategory: "Кроссовки", otherCategories: ["Бег", "Стабильность"] }),
    new Product(50, "NMD_R1", "Adidas", 12600, { mainCategory: "Кроссовки", otherCategories: ["Универсальные", "Футуризм"] }),
];