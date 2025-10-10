from django.db import models


class Brand(models.Model):
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = "brands"
        verbose_name = "Бренд"
        verbose_name_plural = "Бренды"

    def __str__(self):
        return self.name