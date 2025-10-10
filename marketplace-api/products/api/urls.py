from django.urls import path

from products.api.views import ProductListViewSet, ProductFiltersOrderingView, ProductRandView

urlpatterns = [
    path('products/', ProductListViewSet.as_view({"get": "list"}), name='product-list'),
    path('products/random/', ProductRandView.as_view(), name='product-random'),
    path('products/<slug:slug>/', ProductListViewSet.as_view({"get": "retrieve"}), name='product'),

    path('product-filters/', ProductFiltersOrderingView.as_view(), name='product-filters'),
]
