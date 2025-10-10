from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Brand, ProductType
from products.serializers import ProductFiltersSerializer


@extend_schema(
    summary="Список доступных фильтров и сортировок для товаров",
    description=(
            "Этот эндпоинт возвращает:\n"
            "- Список всех типов товаров и их подтипов для фильтрации\n"
            "- Список всех брендов для фильтрации\n"
            "- Список доступных вариантов сортировки для товаров\n\n"
            "Варианты сортировки (ordering).\n"
            "Используйте эти параметры в запросах к списку товаров (например, `/api/products/?ordering=-price`), чтобы управлять сортировкой."
    )
)
class ProductFiltersOrderingView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    serializer_class = ProductFiltersSerializer

    def get(self, request, *args, **kwargs):
        return Response(
            self.serializer_class({
                "types": [
                    {
                        "name": p_type.name,
                        "subtypes": [
                            {
                                "name": subtype.name
                            }
                            for subtype in p_type.subtypes.all()
                        ]
                    }
                    for p_type in ProductType.objects.all()
                ],
                "brands": [
                    {
                        "name": brand.name
                    }
                    for brand in Brand.objects.all()
                ],
                "orderings": [
                    {
                        "name": "created_at",
                    },
                    {
                        "name": "price",
                    },
                    {
                        "name": "-price",
                    },
                    {
                        "name": "-views",
                    },
                    {
                        "name": "-rating",
                    },
                ]
            }).data,
            status=status.HTTP_200_OK,
        )
