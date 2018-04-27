from django.urls import path

from expenses.views import ExpenseViewSet
from expenses.views import UserViewSet
from rest_framework import routers
from django.conf.urls import include

router = routers.DefaultRouter()
router.register(r'expenses', ExpenseViewSet, 'expenses')
router.register(r'users', UserViewSet)

urlpatterns = router.urls + [
    path(r'', include('rest_auth.urls')),
]
