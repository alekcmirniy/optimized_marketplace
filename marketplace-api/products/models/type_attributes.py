from django.db import models

from products.models.product_types import ProductType
from products.models.products import Product


class TypeAttributes(models.Model):
    name = models.CharField(max_length=255, unique=True)
    unit = models.CharField(max_length=255)

    type = models.ForeignKey(ProductType, on_delete=models.CASCADE, related_name='attributes')

    class Meta:
        db_table = "type_attributes"
        verbose_name = "Характеристика типа"
        verbose_name_plural = "Характеристика типа"

    def __str__(self):
        return self.name


class ProductsAttributeM2M(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='attributes')
    attribute = models.ForeignKey(TypeAttributes, on_delete=models.CASCADE, related_name='products')
    value = models.CharField(max_length=255)

    class Meta:
        db_table = "products_attributes"
        verbose_name = "Характеристика продукта"
        verbose_name_plural = "Характеристика продукта"
        unique_together = (("product", "attribute"),)

    def __str__(self):
        return self.product.name + " - " + self.attribute.name
