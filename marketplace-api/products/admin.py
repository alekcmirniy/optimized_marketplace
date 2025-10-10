from django.contrib import admin

from products.models import Product, ProductsSubtypesM2M, ProductsAttributeM2M, ProductImages, ProductSize, ProductType, \
    TypeAttributes, SubType, Brand


class InlineProductsSubtypesM2M(admin.TabularInline):
    model = ProductsSubtypesM2M
    extra = 1


class InlineProductsAttributeM2M(admin.TabularInline):
    model = ProductsAttributeM2M
    extra = 1


class InlineProductImages(admin.TabularInline):
    model = ProductImages
    extra = 1


class InlineProductSizes(admin.TabularInline):
    model = ProductSize
    extra = 1


class ProductAdmin(admin.ModelAdmin):
    inlines = [
        InlineProductsSubtypesM2M,
        InlineProductsAttributeM2M,
        InlineProductImages,
        InlineProductSizes,
    ]
    readonly_fields = ["slug"]


admin.site.register(Product, ProductAdmin)


class InlineTypeAttributes(admin.TabularInline):
    model = TypeAttributes
    extra = 1


class InlineSubtypes(admin.TabularInline):
    model = SubType
    extra = 1


class ProductTypeAdmin(admin.ModelAdmin):
    inlines = [
        InlineTypeAttributes,
        InlineSubtypes,
    ]


admin.site.register(ProductType, ProductTypeAdmin)
admin.site.register(Brand)
