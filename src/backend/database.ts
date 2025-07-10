import Icon from "@/backend/productPhotos/Shoe1.png"
import BagIcon from "@/backend/productPhotos/bag.png"
class Product {
    constructor(
        private readonly _id: number, 
        private readonly model: string, 
        private readonly brand: string, 
        private readonly _price: number, 
        private readonly _imagePath: string,
        private readonly _categories: Categories,
        private readonly _createdAt: string,
        private readonly _rating: number,
        private readonly _visitsNumber: number
    ) {
        this._id = _id;
        this.model = model;
        this.brand = brand;
        this._price = _price;
        this._categories = _categories;
        this._imagePath = _imagePath;
        this._createdAt = _createdAt;
        this._rating = _rating;
        this._visitsNumber = _visitsNumber;
    }
    public getCardDescription() :Array<string> {
        return [`${this._categories.mainCategory} ${this.model}`, `${this.brand}`, `${this.price.toString()} руб.`];
    }
    public get price(): number {
        return this._price;
    }
    public get imagePath(): string {
        return this._imagePath;
    }
    public get id(): number {
        return this._id;
    }
    public get categories(): Categories {
        return this._categories;
    }
    public get createdAt(): string {
        return this._createdAt;
    }
    public get rating(): number {
        return this._rating;
    }
    public get visitsNumber(): number {
        return this._visitsNumber;
    }
};

type Categories = {
    mainCategory: string;
    otherCategories: Array<string>;
};
interface Slide {
    src: string;
    alt: string;
}

import SlideIcon1 from '@/backend/slides/Slide1.png';
import SlideIcon2 from '@/backend/slides/Slide2.png';
import SlideIcon3 from '@/backend/slides/Slide3.png';
import SlideIcon4 from '@/backend/slides/Slide4.png';

const dailySlidesData: Slide[] = [
    { src: SlideIcon1, alt: "Слайд 1" },
    { src: SlideIcon3, alt: "Слайд 2" },
];

const bestSlidesData: Slide[] = [
    { src: SlideIcon4, alt: "Слайд 1" },
    { src: SlideIcon2, alt: "Слайд 2" },
];

const productDatabase: Array<Product> = [
    new Product(1, "Adizero Select II", "Adidas", 12500, Icon, { mainCategory: "Кроссовки", otherCategories: ["Обувь", "Лето"] }, "2023-01-15", 4.5, 245),
    new Product(2, "Air Max 90", "Nike", 14500, Icon, { mainCategory: "Кроссовки", otherCategories: ["Спорт", "Лето"] }, "2023-02-20", 4.7, 312),
    new Product(3, "Classic Leather", "Reebok", 9800, Icon, { mainCategory: "Кроссовки", otherCategories: ["Обувь", "Весна"] }, "2023-01-10", 4.3, 189),
    new Product(4, "Old Skool", "Vans", 8700, Icon, { mainCategory: "Кеды", otherCategories: ["Уличный стиль", "Весна"] }, "2023-03-05", 4.6, 276),
    new Product(5, "Chuck Taylor All Star", "Converse", 9100, Icon, { mainCategory: "Кеды", otherCategories: ["Лето", "Город"] }, "2023-02-15", 4.8, 421),
    new Product(6, "Ultraboost 22", "Adidas", 15700, Icon, { mainCategory: "Кроссовки", otherCategories: ["Бег", "Тренировки"] }, "2023-01-25", 4.9, 387),
    new Product(7, "Gel-Kayano 29", "ASICS", 13800, Icon, { mainCategory: "Кроссовки", otherCategories: ["Бег", "Зима"] }, "2023-03-10", 4.4, 203),
    new Product(8, "FuelCell Rebel", "New Balance", 12500, Icon, { mainCategory: "Кроссовки", otherCategories: ["Фитнес", "Лето"] }, "2023-02-28", 4.2, 156),
    new Product(9, "Zoom Fly 5", "Nike", 15200, Icon, { mainCategory: "Кроссовки", otherCategories: ["Спорт", "Фитнес"] }, "2023-01-30", 4.6, 298),
    new Product(10, "Blazer Mid '77", "Nike", 11200, Icon, { mainCategory: "Кеды", otherCategories: ["Город", "Осень"] }, "2023-03-15", 4.5, 267),
    new Product(11, "Superstar", "Adidas", 10500, Icon, { mainCategory: "Кроссовки", otherCategories: ["Универсальные", "Весна"] }, "2023-02-10", 4.7, 345),
    new Product(12, "Court Vision Low", "Nike", 9500, Icon, { mainCategory: "Кеды", otherCategories: ["Город", "Весна"] }, "2023-01-20", 4.3, 178),
    new Product(13, "Club C 85", "Reebok", 8700, Icon, { mainCategory: "Кеды", otherCategories: ["Стрит", "Весна"] }, "2023-03-01", 4.1, 132),
    new Product(14, "Era", "Vans", 8200, Icon, { mainCategory: "Кеды", otherCategories: ["Универсальные", "Лето"] }, "2023-02-05", 4.4, 254),
    new Product(15, "574", "New Balance", 11900, Icon, { mainCategory: "Кроссовки", otherCategories: ["Город", "Весна"] }, "2023-01-12", 4.6, 287),
    new Product(16, "Sk8-Hi", "Vans", 9300, Icon, { mainCategory: "Кеды", otherCategories: ["Уличный стиль", "Осень"] }, "2023-03-20", 4.5, 231),
    new Product(17, "Stan Smith", "Adidas", 10200, Icon, { mainCategory: "Кроссовки", otherCategories: ["Город", "Лето"] }, "2023-02-15", 4.8, 412),
    new Product(18, "React Infinity Run", "Nike", 14800, Icon, { mainCategory: "Кроссовки", otherCategories: ["Бег", "Фитнес"] }, "2023-01-05", 4.7, 356),
    new Product(19, "Nano X2", "Reebok", 13400, Icon, { mainCategory: "Кроссовки", otherCategories: ["Тренировки", "Зал"] }, "2023-03-12", 4.3, 167),
    new Product(20, "Zoom Freak 4", "Nike", 14200, Icon, { mainCategory: "Кроссовки", otherCategories: ["Баскетбол", "Спорт"] }, "2023-02-22", 4.9, 498),
    new Product(21, "Kamanda", "Adidas", 10800, Icon, { mainCategory: "Кроссовки", otherCategories: ["Лимитированная серия", "Уличный стиль"] }, "2023-01-18", 4.2, 143),
    new Product(22, "Daytona DMX", "Reebok", 11500, Icon, { mainCategory: "Кроссовки", otherCategories: ["Ретро", "Город"] }, "2023-03-08", 4.4, 198),
    new Product(23, "Pegasus Trail 4", "Nike", 13900, Icon, { mainCategory: "Кроссовки", otherCategories: ["Треккинг", "Природа"] }, "2023-02-12", 4.6, 276),
    new Product(24, "Continental 80", "Adidas", 9200, Icon, { mainCategory: "Кеды", otherCategories: ["Город", "Ретро"] }, "2023-01-22", 4.5, 234),
    new Product(25, "ZoomX Vaporfly", "Nike", 19700, Icon, { mainCategory: "Кроссовки", otherCategories: ["Марафон", "Про"] }, "2023-03-25", 4.9, 521),
    new Product(26, "All Court", "Puma", 8400, Icon, { mainCategory: "Кеды", otherCategories: ["Лето", "Универсальные"] }, "2023-02-18", 4.3, 165),
    new Product(27, "Cell Dome", "Puma", 9100, Icon, { mainCategory: "Кроссовки", otherCategories: ["Ретро", "Универсальные"] }, "2023-01-08", 4.1, 128),
    new Product(28, "Disruptor II", "Fila", 7800, Icon, { mainCategory: "Кроссовки", otherCategories: ["Город", "Массивные"] }, "2023-03-18", 4.4, 187),
    new Product(29, "MX-720", "Nike", 16200, Icon, { mainCategory: "Кроссовки", otherCategories: ["Футуризм", "Город"] }, "2023-02-25", 4.7, 321),
    new Product(30, "Zig Kinetica", "Reebok", 9900, Icon, { mainCategory: "Кроссовки", otherCategories: ["Технологии", "Уличный стиль"] }, "2023-01-14", 4.5, 245),
    new Product(31, "Torsion TRDC", "Adidas", 11800, Icon, { mainCategory: "Кроссовки", otherCategories: ["Треккинг", "Осень"] }, "2023-03-22", 4.6, 267),
    new Product(32, "IGNITE Limitless", "Puma", 10800, Icon, { mainCategory: "Кроссовки", otherCategories: ["Фитнес", "Город"] }, "2023-02-08", 4.2, 154),
    new Product(33, "Wave Rider 25", "Mizuno", 13500, Icon, { mainCategory: "Кроссовки", otherCategories: ["Бег", "Про"] }, "2023-01-28", 4.8, 378),
    new Product(34, "Speedcross 5", "Salomon", 12800, Icon, { mainCategory: "Кроссовки", otherCategories: ["Треккинг", "Природа"] }, "2023-03-14", 4.7, 342),
    new Product(35, "XT-6", "Salomon", 14700, Icon, { mainCategory: "Кроссовки", otherCategories: ["Универсальные", "Стиль"] }, "2023-02-14", 4.9, 487),
    new Product(36, "GT-1000 11", "ASICS", 11200, Icon, { mainCategory: "Кроссовки", otherCategories: ["Бег", "Зал"] }, "2023-01-17", 4.4, 201),
    new Product(37, "All Star Lift", "Converse", 9500, Icon, { mainCategory: "Кеды", otherCategories: ["Платформа", "Лето"] }, "2023-03-28", 4.3, 176),
    new Product(38, "RS-X", "Puma", 10900, Icon, { mainCategory: "Кроссовки", otherCategories: ["Город", "Стиль"] }, "2023-02-17", 4.5, 254),
    new Product(39, "Yeezy Boost 350", "Adidas", 24500, Icon, { mainCategory: "Кроссовки", otherCategories: ["Премиум", "Стрит"] }, "2023-01-05", 5.0, 876),
    new Product(40, "Jordan 1 Mid", "Nike", 18700, Icon, { mainCategory: "Кроссовки", otherCategories: ["Баскетбол", "Икона"] }, "2023-03-30", 4.9, 765),
    new Product(41, "Forum Low", "Adidas", 10200, Icon, { mainCategory: "Кеды", otherCategories: ["Классика", "Город"] }, "2023-02-19", 4.6, 287),
    new Product(42, "Classic Nylon", "Reebok", 8100, Icon, { mainCategory: "Кроссовки", otherCategories: ["Ретро", "Повседневные"] }, "2023-01-24", 4.2, 143),
    new Product(43, "Zoom Winflo 9", "Nike", 12200, Icon, { mainCategory: "Кроссовки", otherCategories: ["Фитнес", "Бег"] }, "2023-03-17", 4.4, 198),
    new Product(44, "Pacer Future", "Puma", 8900, Icon, { mainCategory: "Кроссовки", otherCategories: ["Универсальные", "Город"] }, "2023-02-21", 4.3, 165),
    new Product(45, "Trail Glove 6", "Merrell", 9700, Icon, { mainCategory: "Кроссовки", otherCategories: ["Природа", "Минимализм"] }, "2023-01-11", 4.7, 321),
    new Product(46, "Bare Access XTR", "Merrell", 10200, Icon, { mainCategory: "Кроссовки", otherCategories: ["Треккинг", "Фитнес"] }, "2023-03-24", 4.5, 234),
    new Product(47, "Fresh Foam Roav", "New Balance", 11300, Icon, { mainCategory: "Кроссовки", otherCategories: ["Бег", "Зал"] }, "2023-02-13", 4.6, 276),
    new Product(48, "Cloud X", "On Running", 15300, Icon, { mainCategory: "Кроссовки", otherCategories: ["Фитнес", "Про"] }, "2023-01-07", 4.8, 387),
    new Product(49, "Zoom Structure 24", "Nike", 13900, Icon, { mainCategory: "Кроссовки", otherCategories: ["Бег", "Стабильность"] }, "2023-03-19", 4.7, 345),
    new Product(50, "NMD_R1", "Adidas", 12600, Icon, { mainCategory: "Кроссовки", otherCategories: ["Универсальные", "Футуризм"] }, "2023-02-24", 4.9, 432),
    new Product(51, "Cago 1", "Harry Hatchet", 125000, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Кожа"] }, "2023-01-09", 4.9, 543),
    new Product(52, "Executive Briefcase", "Tumi", 24500, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Кожа"] }, "2023-03-02", 4.7, 321),
    new Product(53, "Metropolitan", "Tumi", 18900, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Город"] }, "2023-02-11", 4.5, 234),
    new Product(54, "Leather Portfolio", "Fossil", 14500, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Кожа"] }, "2023-01-19", 4.6, 276),
    new Product(55, "Business Elite", "Samsonite", 16700, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Премиум"] }, "2023-03-09", 4.8, 387),
    new Product(56, "Document Holder", "Braun Buffel", 10800, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Мини"] }, "2023-02-16", 4.3, 154),
    new Product(57, "Heritage Briefcase", "Dunhill", 24500, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Люкс"] }, "2023-01-23", 4.9, 498),
    new Product(58, "Leather Portfolio", "Bally", 18700, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Премиум"] }, "2023-03-13", 4.7, 345),
    new Product(59, "Professional Attaché", "Montblanc", 32000, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Люкс"] }, "2023-02-27", 5.0, 654),
    new Product(60, "Laptop Messenger", "Dell", 13500, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Кожа"] }, "2023-01-16", 4.4, 187),
    new Product(61, "Boardroom Case", "Hugo Boss", 19800, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Престиж"] }, "2023-03-23", 4.8, 432),
    new Product(62, "Signature Brief", "Coach", 17500, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Кожа"] }, "2023-02-09", 4.6, 287),
    new Product(63, "Corporate Tote", "Kate Spade", 14200, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Женская"] }, "2023-01-21", 4.5, 231),
    new Product(64, "Executive Leather", "Ted Baker", 15600, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Кожа"] }, "2023-03-07", 4.7, 321),
    new Product(65, "Minimalist Brief", "Bellroy", 12800, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Минимализм"] }, "2023-02-23", 4.4, 176),
    new Product(66, "Bond Street", "Aspinal of London", 21000, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Люкс"] }, "2023-01-13", 4.9, 543),
    new Product(67, "Tech Commuter", "Targus", 9500, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Кожа"] }, "2023-03-27", 4.2, 132),
    new Product(68, "Classic Attaché", "Hartmann", 22500, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Винтаж"] }, "2023-02-26", 4.7, 312),
    new Product(69, "Power Laptop Bag", "Lenovo", 11500, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Винтаж"] }, "2023-01-29", 4.3, 154),
    new Product(70, "Leather Organizer", "Saddleback", 19500, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Кожа"] }, "2023-03-21", 4.8, 421),
    new Product(71, "Urban Executive", "Kenneth Cole", 13800, BagIcon, { mainCategory: "Сумка", otherCategories: ["Деловой стиль", "Город"] }, "2023-02-07", 4.5, 245),

    new Product(72, "Bomber Jacket", "Alpha Industries", 18900, Icon, { mainCategory: "Куртки", otherCategories: ["Уличный стиль", "Зима"] }, "2023-04-05", 4.7, 287),
    new Product(73, "Denim Jacket", "Levi's", 14500, Icon, { mainCategory: "Куртки", otherCategories: ["Джинсовая", "Весна"] }, "2023-04-12", 4.5, 231),
    new Product(74, "Puffer Jacket", "The North Face", 24500, Icon, { mainCategory: "Куртки", otherCategories: ["Зима", "Утепленные"] }, "2023-04-18", 4.8, 356),
    new Product(75, "Leather Jacket", "Schott NYC", 32000, Icon, { mainCategory: "Куртки", otherCategories: ["Кожаные", "Классика"] }, "2023-04-22", 4.9, 421),
    new Product(76, "Windbreaker", "Adidas", 11200, Icon, { mainCategory: "Куртки", otherCategories: ["Спорт", "Демисезон"] }, "2023-04-08", 4.3, 187),

    new Product(77, "501 Original", "Levi's", 8900, Icon, { mainCategory: "Джинсы", otherCategories: ["Классические", "Прямые"] }, "2023-04-15", 4.6, 312),
    new Product(78, "Skinny Fit", "Diesel", 12500, Icon, { mainCategory: "Джинсы", otherCategories: ["Облегающие", "Мода"] }, "2023-04-20", 4.4, 254),
    new Product(79, "Mom Jeans", "Wrangler", 9500, Icon, { mainCategory: "Джинсы", otherCategories: ["Высокая талия", "Ретро"] }, "2023-04-10", 4.7, 298),
    new Product(80, "Slim Straight", "G-Star RAW", 13500, Icon, { mainCategory: "Джинсы", otherCategories: ["Узкие", "Премиум"] }, "2023-04-25", 4.5, 276),
    new Product(81, "Relaxed Fit", "Lee", 7800, Icon, { mainCategory: "Джинсы", otherCategories: ["Свободные", "Комфорт"] }, "2023-04-14", 4.2, 165),

    new Product(82, "Classic Logo", "Supreme", 6500, Icon, { mainCategory: "Футболки", otherCategories: ["Брендовые", "Лето"] }, "2023-04-07", 4.8, 432),
    new Product(83, "Graphic Tee", "Stüssy", 5400, Icon, { mainCategory: "Футболки", otherCategories: ["Принт", "Уличный стиль"] }, "2023-04-16", 4.6, 345),
    new Product(84, "Oversized", "Balenciaga", 18700, Icon, { mainCategory: "Футболки", otherCategories: ["Оверсайз", "Люкс"] }, "2023-04-24", 4.3, 198),
    new Product(85, "Pocket Tee", "Carhartt", 7200, Icon, { mainCategory: "Футболки", otherCategories: ["Карман", "Базовые"] }, "2023-04-11", 4.5, 267),
    new Product(86, "Vintage Wash", "Champion", 6100, Icon, { mainCategory: "Футболки", otherCategories: ["Ретро", "Винтаж"] }, "2023-04-19", 4.7, 321),

    new Product(87, "Cargo Shorts", "C.P. Company", 11200, Icon, { mainCategory: "Шорты", otherCategories: ["Карго", "Утилитарные"] }, "2023-04-13", 4.4, 231),
    new Product(88, "Denim Shorts", "Tommy Jeans", 8500, Icon, { mainCategory: "Шорты", otherCategories: ["Джинсовые", "Лето"] }, "2023-04-21", 4.6, 287),
    new Product(89, "Running Shorts", "Nike", 6800, Icon, { mainCategory: "Шорты", otherCategories: ["Спорт", "Тренировки"] }, "2023-04-09", 4.5, 254),
    new Product(90, "Chino Shorts", "Lacoste", 9800, Icon, { mainCategory: "Шорты", otherCategories: ["Чинос", "Классика"] }, "2023-04-17", 4.3, 187),
    new Product(91, "Swim Trunks", "Patagonia", 7600, Icon, { mainCategory: "Шорты", otherCategories: ["Пляжные", "Быстросохнущие"] }, "2023-04-23", 4.7, 312),

    new Product(92, "Dad Hat", "New Era", 4500, BagIcon, { mainCategory: "Аксессуары", otherCategories: ["Бейсболка", "Уличный стиль"] }, "2023-04-06", 4.5, 276),
    new Product(93, "Silk Scarf", "Gucci", 12500, BagIcon, { mainCategory: "Аксессуары", otherCategories: ["Шелк", "Люкс"] }, "2023-04-26", 4.8, 387),
    new Product(94, "Leather Belt", "Hermès", 9800, BagIcon, { mainCategory: "Аксессуары", otherCategories: ["Кожа", "Классика"] }, "2023-04-27", 4.7, 345),
    new Product(95, "Aviator Sunglasses", "Ray-Ban", 14500, BagIcon, { mainCategory: "Аксессуары", otherCategories: ["Очки", "Ретро"] }, "2023-04-28", 4.9, 498),
    new Product(96, "Cashmere Gloves", "Burberry", 8700, BagIcon, { mainCategory: "Аксессуары", otherCategories: ["Зима", "Премиум"] }, "2023-04-29", 4.6, 267),

    new Product(97, "Parka", "Canada Goose", 42000, Icon, { mainCategory: "Куртки", otherCategories: ["Зима", "Утепленные"] }, "2023-05-01", 4.9, 543),
    new Product(98, "Suede Jacket", "Polo Ralph Lauren", 24500, Icon, { mainCategory: "Куртки", otherCategories: ["Замша", "Классика"] }, "2023-05-02", 4.7, 321),
    new Product(99, "Quilted Jacket", "Barbour", 18900, Icon, { mainCategory: "Куртки", otherCategories: ["Стеганые", "Осень"] }, "2023-05-03", 4.6, 287),
    new Product(100, "Rain Jacket", "Stutterheim", 15600, Icon, { mainCategory: "Куртки", otherCategories: ["Дождевик", "Водоотталкивающие"] }, "2023-05-04", 4.5, 231),
    new Product(101, "Harrington", "Baracuta", 17800, Icon, { mainCategory: "Куртки", otherCategories: ["Классика", "Гольф"] }, "2023-05-05", 4.8, 387),

    new Product(102, "Tapered Fit", "Nudie Jeans", 13500, Icon, { mainCategory: "Джинсы", otherCategories: ["Суженные", "Премиум"] }, "2023-05-06", 4.7, 321),
    new Product(103, "Wide Leg", "Issey Miyake", 16700, Icon, { mainCategory: "Джинсы", otherCategories: ["Широкие", "Дизайнерские"] }, "2023-05-07", 4.4, 198),
    new Product(104, "Black Raw", "Acne Studios", 18900, Icon, { mainCategory: "Джинсы", otherCategories: ["Черные", "Сырой деним"] }, "2023-05-08", 4.9, 456),
    new Product(105, "Cropped Jeans", "Mango", 9200, Icon, { mainCategory: "Джинсы", otherCategories: ["Укороченные", "Лето"] }, "2023-05-09", 4.3, 176),
    new Product(106, "Destroyed", "Represent", 14500, Icon, { mainCategory: "Джинсы", otherCategories: ["Потертые", "Гранж"] }, "2023-05-10", 4.6, 287),

    new Product(107, "Band Tee", "Rolling Stones", 7800, Icon, { mainCategory: "Футболки", otherCategories: ["Музыка", "Винтаж"] }, "2023-05-11", 4.8, 412),
    new Product(108, "Long Sleeve", "Comme des Garçons", 14500, Icon, { mainCategory: "Футболки", otherCategories: ["Длинный рукав", "Дизайнерские"] }, "2023-05-12", 4.5, 276),
    new Product(109, "Organic Cotton", "Arket", 6500, Icon, { mainCategory: "Футболки", otherCategories: ["Эко", "Базовые"] }, "2023-05-13", 4.7, 321),
    new Product(110, "Striped Tee", "Saint James", 8900, Icon, { mainCategory: "Футболки", otherCategories: ["Полоски", "Морской стиль"] }, "2023-05-14", 4.6, 287),
    new Product(111, "Boxy Fit", "COS", 7200, Icon, { mainCategory: "Футболки", otherCategories: ["Свободные", "Минимализм"] }, "2023-05-15", 4.4, 213),

    new Product(112, "Linen Shorts", "Massimo Dutti", 8500, Icon, { mainCategory: "Шорты", otherCategories: ["Лен", "Лето"] }, "2023-05-16", 4.5, 254),
    new Product(113, "Bermuda", "Hackett", 11200, Icon, { mainCategory: "Шорты", otherCategories: ["Бермуды", "Классика"] }, "2023-05-17", 4.3, 187),
    new Product(114, "Cycling Shorts", "Adidas", 6800, Icon, { mainCategory: "Шорты", otherCategories: ["Велоспорт", "Облегающие"] }, "2023-05-18", 4.7, 312),
    new Product(115, "Tailored Shorts", "Reiss", 9800, Icon, { mainCategory: "Шорты", otherCategories: ["Классические", "Офис"] }, "2023-05-19", 4.6, 276),
    new Product(116, "Jersey Shorts", "Puma", 5400, Icon, { mainCategory: "Шорты", otherCategories: ["Спорт", "Комфорт"] }, "2023-05-20", 4.2, 154),

    new Product(117, "Bucket Hat", "Prada", 12500, BagIcon, { mainCategory: "Аксессуары", otherCategories: ["Летняя", "Дизайнерская"] }, "2023-05-21", 4.8, 387),
    new Product(118, "Wool Beanie", "Moncler", 6500, BagIcon, { mainCategory: "Аксессуары", otherCategories: ["Зима", "Шерсть"] }, "2023-05-22", 4.6, 287),
    new Product(119, "Braided Belt", "Dolce & Gabbana", 11200, BagIcon, { mainCategory: "Аксессуары", otherCategories: ["Кожа", "Дизайнерский"] }, "2023-05-23", 4.7, 321),
    new Product(120, "Round Sunglasses", "Persol", 15600, BagIcon, { mainCategory: "Аксессуары", otherCategories: ["Очки", "Ретро"] }, "2023-05-24", 4.9, 456),
    new Product(121, "Silk Pocket Square", "Brioni", 4500, BagIcon, { mainCategory: "Аксессуары", otherCategories: ["Шелк", "Деловой"] }, "2023-05-25", 4.5, 231)
];

let dailyId = 54;
const dailyProduct = productDatabase.find((product) => {return product.id === dailyId});

const mainCategoriesStructure = new Set(productDatabase.map((item) => (item.categories.mainCategory)));
const otherCategoriesStructure = new Set(productDatabase.flatMap((item) => (item.categories.otherCategories)));

const sortCatalogBy = async function(arr: Array<Product>, option: string) :Promise<Array<Product>> {
        const sortedArr = [...arr];
        switch (option) {
            case "descending-price":
                return sortedArr.sort((prod1: Product, prod2: Product) => (prod2.price - prod1.price));
                break;
            case "ascending-price":
                return sortedArr.sort((prod1: Product, prod2: Product) => (prod1.price - prod2.price));
                break;
            case "new-ones-first":
                return sortedArr.sort((prod1: Product, prod2: Product) => (new Date(prod1.createdAt).getTime() - new Date(prod2.createdAt).getTime()));
                break;
            case "best-rating":
                return sortedArr.sort((prod1: Product, prod2: Product) => (prod2.rating - prod1.rating));
                break;
            case "popular":
                return sortedArr.sort((prod1: Product, prod2: Product) => (prod2.visitsNumber - prod1.visitsNumber));
                break;
            default:
                console.error("Неверный параметр сортировки!");
                return sortedArr;
    };
};

const applyFiltersAndCategories = async function(context: {
    selectedCategories: Array<Array<string>>,
    activeFilter: string
}): Promise<Array<Product>> 
    {
    let filteredProducts = [...productDatabase];

    const [mainCategories, otherCategories] = context.selectedCategories;
    const hasMain = mainCategories?.length > 0;
    const hasOther = otherCategories?.length > 0;

    if (hasMain || hasOther) {
        const mainSet = new Set(mainCategories);
        const otherSet = new Set(otherCategories);

        const andResults: Product[] = [];
        const orResults: Product[] = [];

        for (const product of filteredProducts) {
            const matchMain = !hasMain || mainSet.has(product.categories.mainCategory);
            const matchOther = !hasOther || product.categories.otherCategories.some(cat => otherSet.has(cat));

            if (matchMain && matchOther) {
                andResults.push(product);
            } else if (matchMain || matchOther) {
                orResults.push(product);
            }
        }
        filteredProducts = andResults.length ? andResults : orResults;
    }

    if (context.activeFilter) {
        filteredProducts = await sortCatalogBy(filteredProducts, context.activeFilter);
    }
    return filteredProducts;
}
export { dailyProduct };
export { productDatabase };
export { dailySlidesData };
export { bestSlidesData };
export { Product };

export { applyFiltersAndCategories };
export { sortCatalogBy };

export type { Slide };

export { mainCategoriesStructure };
export { otherCategoriesStructure };