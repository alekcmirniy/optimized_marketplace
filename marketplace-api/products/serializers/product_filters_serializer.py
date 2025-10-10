from rest_framework import serializers


class SubtypeFromProductFiltersSerializer(serializers.Serializer):
    name = serializers.CharField()


class TypeFromProductFiltersSerializer(serializers.Serializer):
    name = serializers.CharField()
    subtypes = SubtypeFromProductFiltersSerializer(many=True)


class BrandFromProductFiltersSerializer(serializers.Serializer):
    name = serializers.CharField()


class OrderingFromProductFiltersSerializer(serializers.Serializer):
    name = serializers.CharField()


class ProductFiltersSerializer(serializers.Serializer):
    types = TypeFromProductFiltersSerializer(many=True)
    brands = BrandFromProductFiltersSerializer(many=True)
    orderings = OrderingFromProductFiltersSerializer(many=True)
