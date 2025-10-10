import uuid

from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from slugify import slugify

from products.models.brand import Brand
from products.models.product_types import ProductType


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(
        max_digits=12, decimal_places=2, null=False, blank=False, db_index=True
    )

    created_at = models.DateTimeField(auto_now_add=True)
    rating = models.FloatField(
        default=0,
        validators=[
            MinValueValidator(0),
            MaxValueValidator(5),
        ]
    )
    views = models.BigIntegerField(default=0)

    brand = models.ForeignKey(Brand, on_delete=models.PROTECT, related_name='products')
    type = models.ForeignKey(ProductType, on_delete=models.PROTECT, related_name='products')

    slug = models.SlugField(unique=True, max_length=255, editable=False, null=True)

    class Meta:
        db_table = "products"
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Генерируем slug только при создании объекта
        if self.pk is None:
            self.slug = slugify(str(uuid.uuid4().int)[:5] + ' ' + str(self.name))
        super().save(*args, **kwargs)
