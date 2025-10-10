from django_filters.rest_framework import filters, DjangoFilterBackend, FilterSet
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import mixins, viewsets, pagination
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import AllowAny

from products.models import Product
from products.serializers import ProductSerializer


class CharInFilter(filters.BaseInFilter, filters.CharFilter):
    """Поддержка CSV-списка строк: ?param=a,b,c"""
    pass

class ProductFilter(FilterSet):
    brand = CharInFilter(field_name="brand__name", lookup_expr="in")
    type = CharInFilter(field_name="type__name", lookup_expr="in")
    subtype = CharInFilter(field_name="subtypes__subtype__name", lookup_expr="in")

    class Meta:
        model = Product
        fields = ["brand", "type", "subtype"]


class ProductPagination(pagination.PageNumberPagination):
    page_size = 16


@extend_schema(
    parameters=[
        OpenApiParameter(
            "brand", OpenApiTypes.STR, OpenApiParameter.QUERY,
            description="Список брендов через запятую: brand=Apple,Samsung",
            many=True,
        ),
        OpenApiParameter(
            "type", OpenApiTypes.STR, OpenApiParameter.QUERY,
            description="Список типов через запятую: type=Phone,Tablet",
            many=True,
        ),
        OpenApiParameter(
            "subtype", OpenApiTypes.STR, OpenApiParameter.QUERY,
            description="Список подтипов через запятую: subtype=Pro,Max",
            many=True,
        ),
        OpenApiParameter(
            "ordering", OpenApiTypes.STR, OpenApiParameter.QUERY,
            description="Сортировка: price,-price,created_at,-created_at,rating,-rating,views,-views",
        ),
        OpenApiParameter("page", OpenApiTypes.INT, OpenApiParameter.QUERY, description="Номер страницы"),
    ]
)
class ProductListViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    permission_classes = [AllowAny]
    queryset = (
        Product.objects.all()
        .select_related("brand", "type")
        .prefetch_related("subtypes", "subtypes__subtype")
    )
    serializer_class = ProductSerializer
    lookup_field = "slug"

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ProductFilter
    ordering_fields = ["price", "created_at", "rating", "views"]
    ordering = ["price"]

    pagination_class = ProductPagination
