from rest_framework import viewsets
from rest_framework.generics import RetrieveAPIView

from products.models import Product
from products.serializers import ProductSerializer


class ProductRandView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_object(self):
        random_product = self.get_queryset().order_by('?').first()
        if not random_product:
            from rest_framework.exceptions import NotFound
            raise NotFound(detail="Нет доступных товаров.")
        return random_product
