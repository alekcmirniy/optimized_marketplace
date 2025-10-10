from django.db import models

from products.models.products import Product
from products.models.product_types import ProductType


class SubType(models.Model):
    name = models.CharField(max_length=255)

    type = models.ForeignKey(ProductType, on_delete=models.CASCADE, related_name='subtypes')

    class Meta:
        db_table = "subtypes"
        verbose_name = "Подтип"
        verbose_name_plural = "Подтипы"

    def __str__(self):
        return self.name


class ProductsSubtypesM2M(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='subtypes')
    subtype = models.ForeignKey(SubType, on_delete=models.CASCADE, related_name='products')

    class Meta:
        db_table = "products_subtypes"
        verbose_name = "Связь продукта и подтипа"
        verbose_name_plural = "Связи продукта и подтипа"
        unique_together = (("product", "subtype"),)


    def __str__(self):
        return self.product.name + " -- " + self.subtype.name

