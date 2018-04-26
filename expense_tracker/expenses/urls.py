from expenses.views import ExpenseViewSet
from rest_framework import routers
from django.conf.urls import include, url

router = routers.SimpleRouter()
router.register(r'expenses', ExpenseViewSet, 'expenses')
# router.register(r'users', UserViewSet)

urlpatterns = router.urls + [
    url(r'^', include('rest_auth.urls')),
    url(r'^registration/', include('rest_auth.registration.urls'))
]
