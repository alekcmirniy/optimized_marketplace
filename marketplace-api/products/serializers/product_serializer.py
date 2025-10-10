from decimal import Decimal, ROUND_HALF_UP

from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from products.models import Product, ProductSize, ProductImages, ProductsAttributeM2M


class ImagesFromProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = [
            "image",
            "is_preview",
        ]

    def get_image(self, obj):
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url


class SizesFromProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = [
            "size",
            "quantity",
        ]


class SubtypeFromProductSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="subtype.name")

    class Meta:
        model = ProductsAttributeM2M
        fields = [
            "name"
        ]


class AttributesFromProductSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='attribute.name')
    unit = serializers.CharField(source='attribute.unit')

    class Meta:
        model = ProductsAttributeM2M
        fields = [
            "name",
            "value",
            "unit"
        ]


class ProductSerializer(serializers.ModelSerializer):
    images = SerializerMethodField()
    sizes = SizesFromProductSerializer(many=True)
    subtypes = SubtypeFromProductSerializer(many=True)
    attributes = AttributesFromProductSerializer(many=True)
    type = serializers.CharField(source='type.name')
    brand = serializers.CharField(source='brand.name')

    price = serializers.SerializerMethodField()
    def get_price(self, obj):
        v = obj.price.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        if v == v.to_integral():
            return str(v.to_integral())
        return f"{v:.2f}"


    def get_images(self, obj) -> ImagesFromProductSerializer(many=True).data:
        return ImagesFromProductSerializer(obj.images.all(), many=True,
                                           context={'request': self.context["request"]}).data

    class Meta:
        model = Product
        fields = [
            "name",
            "description",
            "price",
            "created_at",
            "rating",
            "views",
            "brand",
            "type",
            "slug",
            "images",
            "sizes",
            "subtypes",
            "attributes",
        ]
