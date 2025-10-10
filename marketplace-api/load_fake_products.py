import os
import django
import random
from faker import Faker
from django.core.files import File
from django.utils.text import slugify

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'marketplace_api.settings')
django.setup()

from products.models.brand import Brand
from products.models.product_images import ProductImages
from products.models.product_types import ProductType
from products.models.products import Product
from products.models.sizes import ProductSize
from products.models.subtypes import SubType, ProductsSubtypesM2M
from products.models.type_attributes import TypeAttributes, ProductsAttributeM2M

# ========== Инициализация ==========
fake = Faker()

IMAGE_PATHS = {
    'sneakers': '/app/productPhotos/sneakers/',
    'boots': '/app/productPhotos/boots/',
    'sandals': '/app/productPhotos/sandals/',
    'bags': '/app/productPhotos/bags/',
    'jackets': '/app/productPhotos/jackets/'
}

BRANDS = [
    'Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance',
    'The North Face', 'Columbia', 'Gucci', 'Prada'
]

REAL_MODELS = {
    'Adidas': [
        'Adizero Select II', 'Ultraboost Light', 'Supernova Rise', 'Gazelle', 'Samba OG',
        'Forum Low', 'Ozweego', 'Campus 00s', 'Terrex Swift R3', 'Adilette Comfort'
    ],
    'Nike': [
        'Air Max 90', 'Air Max 270', 'Dunk Low Retro', 'Air Force 1', 'Zoom Freak 5',
        'Pegasus 40', 'React Infinity Run', 'Blazer Mid', 'Waffle One', 'Air Zoom Structure 24'
    ],
    'Puma': [
        'RS-X Efekt', 'Deviate Nitro 2', 'Suede Classic XXI', 'Future Rider', 'Slipstream',
        'Cali Dream', 'X-Ray Speed', 'Velocity Nitro 3', 'Rebound Joy', 'Mayze Stack'
    ],
    'Reebok': [
        'Nano X4', 'Classic Leather', 'Zig Kinetica', 'Floatride Energy 5', 'Club C 85',
        'Royal Glide', 'Workout Plus', 'Flexagon Energy', 'DMX Series 2K', 'ZPrint 3D'
    ],
    'New Balance': [
        '574 Core', 'Fresh Foam X 1080', '9060', '990v5', '327', '550', '2002R',
        'Fresh Foam More v4', 'FuelCell Rebel v3', 'CT302'
    ],
    'The North Face': [
        'ThermoBall Eco', 'Vectiv Fastpack', 'Dryzzle Futurelight', 'Apex Bionic Jacket',
        'Summit Breithorn Hoodie', 'Verto Alpine', 'Denali Fleece', 'Antora Jacket',
        'Hedgehog Futurelight', 'Nuptse 1996'
    ],
    'Columbia': [
        'Bugaboot III', 'Trailstorm', 'Powder Lite', 'Watertight II Jacket', 'Newton Ridge Plus',
        'Facet 75 Outdry', 'Silver Ridge Utility', 'Ivo Trail Breeze', 'Crestwood Mid', 'Flash Challenger'
    ],
    'Gucci': [
        'Ace Sneakers', 'Rhyton', 'Screener', 'GG Supreme', 'Pursuit Slide', 'Tennis 1977',
        'Run Sneakers', 'Chunky Rhyton', 'Web Belt Bag', 'Horsebit Loafer'
    ],
    'Prada': [
        'Cloudbust Thunder', 'America\'s Cup', 'Downtown', 'Monolith Boot', 'Linea Rossa Sneakers',
        'Brushed Leather Derby', 'Triangle Shoulder Bag', 'Re-Nylon Backpack', 'Saffiano Loafer', 'Fusion Sneakers'
    ]
}


PRODUCT_TYPES = {
    'Sneakers': ['Running', 'Basketball', 'Casual'],
    'Boots': ['Winter', 'All-Season'],
    'Sandals': ['Beach', 'Sport'],
    'Bags': ['Backpacks', 'Crossbody'],
    'Jackets': ['All-Season', 'Winter']
}

ATTRIBUTES = {
    'Color': ['Black', 'White', 'Blue', 'Red', 'Green'],
    'Material': ['Leather', 'Suede', 'Textile', 'Cotton'],
    'Size': ['XS', 'S', 'M', 'L', 'XL']
}

PRICE_RANGES = {
    'Sneakers': (8000, 35000),
    'Boots': (5000, 35000),
    'Sandals': (2000, 15000),
    'Bags': (1500, 20000),
    'Jackets': (4000, 30000)
}


def get_realistic_price(min_price, max_price):
    raw_price = random.randint(min_price, max_price)
    base = raw_price // 1000 * 1000
    remainder = raw_price % 1000
    if remainder < 500:
        return base + 499
    return base + 999


def singularize_category(category: str) -> str:
    singulars = {
        'Sneakers': 'Sneakers',
        'Boots': 'Boots',
        'Sandals': 'Sandals',
        'Bags': 'Bag',
        'Jackets': 'Jacket',
        'Backpacks': 'Backpack',
        'Crossbody': 'Crossbody'
    }
    return singulars.get(category, category)


def initialize_data():
    brands = [Brand.objects.get_or_create(name=name)[0] for name in BRANDS]

    product_types = {}
    subtypes = {}
    for type_name, subtype_names in PRODUCT_TYPES.items():
        type_obj = ProductType.objects.get_or_create(name=type_name)[0]
        product_types[type_name] = type_obj

        for subtype_name in subtype_names:
            subtype = SubType.objects.get_or_create(
                name=subtype_name,
                type=type_obj
            )[0]
            subtypes[f"{type_name}_{subtype_name}"] = subtype

    attributes = {}
    first_type = list(product_types.values())[0]

    for attr_name, values in ATTRIBUTES.items():
        attr = TypeAttributes.objects.get_or_create(
            name=attr_name,
            unit=attr_name.lower(),
            type=first_type
        )[0]
        attributes[attr_name] = {
            'obj': attr,
            'values': values
        }

    return {
        'brands': brands,
        'product_types': product_types,
        'subtypes': subtypes,
        'attributes': attributes
    }


def create_products(total_products=300):
    data = initialize_data()
    created_count = 0

    while created_count < total_products:
        try:
            type_name = random.choice(list(data['product_types'].keys()))
            product_type = data['product_types'][type_name]
            subtype_name = random.choice(PRODUCT_TYPES[type_name])
            subtype = data['subtypes'][f"{type_name}_{subtype_name}"]
            brand = random.choice(data['brands'])

            brand_name = brand.name
            model_name = random.choice(REAL_MODELS.get(brand_name, [fake.word().capitalize()]))
            category = singularize_category(type_name)
            name = f"{category} {model_name}"
            slug = slugify(f"{name}-{random.randint(1000, 9999)}")
            description = fake.paragraph(nb_sentences=3)
            min_price, max_price = PRICE_RANGES[type_name]
            price = str(get_realistic_price(min_price, max_price))

            rating = round(random.uniform(0, 5), 1)
            views = random.randint(0, 5000)

            product = Product.objects.create(
                name=name,
                slug=slug,
                description=description,
                price=price,
                brand=brand,
                type=product_type,
                rating=rating,
                views=views,
            )

            # ========== Размеры ==========
            if type_name in ['Sneakers', 'Boots']:
                sizes = random.sample(range(36, 47), random.randint(1, 3))
                for size in sizes:
                    ProductSize.objects.create(
                        size=str(size),
                        quantity=random.randint(1, 50),
                        product=product
                    )
            elif type_name == 'Jackets':
                sizes = random.choices(['XS', 'S', 'M', 'L', 'XL'], k=random.randint(1, 3))
                for size in sizes:
                    ProductSize.objects.create(
                        size=size,
                        quantity=random.randint(1, 50),
                        product=product
                    )
            else:
                ProductSize.objects.create(
                    size="Universal",
                    quantity=random.randint(1, 50),
                    product=product
                )

            # ========== Фотография ==========
            image_path = '/app/productPhotos/sneakers/Shoe1.png'  # фиксированное изображение
            if os.path.exists(image_path):
                with open(image_path, 'rb') as img_file:
                    image = ProductImages(product=product)
                    image.image.save(os.path.basename(image_path), File(img_file))
                    image.save()
            else:
                print(f"⚠️ Image not found: {image_path}")

            # ========== Подтипы и атрибуты ==========
            ProductsSubtypesM2M.objects.get_or_create(
                product=product,
                subtype=subtype
            )

            for attr_name, attr_data in data['attributes'].items():
                ProductsAttributeM2M.objects.create(
                    product=product,
                    attribute=attr_data['obj'],
                    value=random.choice(attr_data['values'])
                )

            created_count += 1
            if created_count % 100 == 0:
                print(f"✔️ Created {created_count}/{total_products} products")

        except Exception as e:
            print(f"⚠️ Error creating product: {str(e)}")
            continue

    print(f"✅ All {total_products} products created successfully")


if __name__ == "__main__":
    create_products(300)