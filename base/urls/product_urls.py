from django.urls import path
from base.views import product_views as views


urlpatterns = [
    path('', views.getProducts, name='products'),


    path('company/',views.companyDetails,name='company-details'),
    # path('category/<str:category>/', views.getCategory, name='product-caetgory'),
    path('company/seller/',views.getCompany,name='company-seller'),


    path('company/seller/products/',views.getProductsByCompany,name='company-seller-products'),


    path('upload/', views.uploadImage, name='image-upload'),
    
    path('create/', views.createProduct, name='product-create'),

    path('<str:pk>/reviews/', views.createProductReview, name='create-review'),

    path('top/', views.getTopProducts, name='top-products'),
    
    path('<str:pk>/', views.getProduct, name='product'),


    path('update/<str:pk>/', views.updateProduct, name='product-update'),
    
    path('delete/<str:pk>/', views.deleteProduct, name='product-delete'),

    


]