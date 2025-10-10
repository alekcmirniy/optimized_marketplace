from django.db import models

from products.models.products import Product


class ProductSize(models.Model):
    size = models.CharField(max_length=50)
    quantity = models.IntegerField(default=0)

    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='sizes')

    class Meta:
        db_table = "sizes"
        verbose_name = "Размер"
        verbose_name_plural = "Размеры"

    def __str__(self):
        return f"Продукт: {self.product.name}, Размер: {self.size}, Количество: {self.quantity}"
