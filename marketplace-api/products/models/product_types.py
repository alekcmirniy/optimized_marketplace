from django.db import models


class ProductType(models.Model):
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = "types"
        verbose_name = "Тип"
        verbose_name_plural = "Типы"

    def __str__(self):
        return self.name