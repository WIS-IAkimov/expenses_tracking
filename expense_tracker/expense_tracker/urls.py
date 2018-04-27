from django.contrib import admin
from django.urls import path
from django.conf.urls import include

from rest_framework_jwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token-refresh/', jwt_views.refresh_jwt_token),
    path('api/token-verify/', jwt_views.verify_jwt_token),
    path('api/', include(('expenses.urls', 'expenses'), namespace='api'))
]
