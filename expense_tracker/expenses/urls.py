from expenses.views import ExpenseViewSet
from expenses.views import UserViewSet
from rest_framework import routers

router = routers.DefaultRouter()

# add users/expenses routes into default router
router.register(r'expenses', ExpenseViewSet, 'expenses')
router.register(r'users', UserViewSet)

urlpatterns = router.urls
