from django.db import models

from products.models.products import Product
from utils import generate_file_name


def product_upload_to(instance, filename):
    return f'products/images/{instance.product.slug}/{generate_file_name(filename)}'


class ProductImages(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')

    image = models.ImageField(upload_to=product_upload_to)

    is_preview = models.BooleanField(default=False)

    class Meta:
        db_table = "product_images"
        verbose_name = "Изображение продукта"
        verbose_name_plural = "Изображения продуктов"

    def __str__(self):
        return f"{self.product.name} -> {"основное" if self.is_preview else "второстепенное"}"

    def save(self, *args, **kwargs):
        if self.is_preview:
            ProductImages.objects.filter(product=self.product, is_preview=True).update(is_preview=False)
        super().save(*args, **kwargs)
