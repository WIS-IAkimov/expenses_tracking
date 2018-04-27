from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework import viewsets
from rest_framework.decorators import list_route, action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters import rest_framework as filters

from expenses import serializers as app_serializers
from expenses.filters import ExpensesFilter
from expenses.permissions import RolePermission

UserModel = get_user_model()


class ExpenseViewSet(viewsets.ModelViewSet):
    """
    DRF ViewSet for listing and CRUD operations on expenses.
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = app_serializers.ExpenseSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = ExpensesFilter

    def get_queryset(self):
        return self.request.user.expenses.all().order_by('created_at')

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)


class UserViewSet(viewsets.ModelViewSet):
    """
    DRF ViewSet for listing and CRUD operations on users.
    """
    queryset = UserModel.objects.all().order_by('id')
    permission_classes = (IsAuthenticated, RolePermission)
    serializer_class = app_serializers.UserSerializer
    allowed_groups = (
        settings.ACCESS_GROUPS_MANAGER,
        settings.ACCESS_GROUPS_ADMIN
    )

    @action(serializer_class=app_serializers.UserPasswordSerializer,
            methods=['post'], detail=True, url_path='change-password',
            url_name='change-password')
    def change_password(self, request, pk, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data, user=user)
        serializer.is_valid(raise_exception=True)
        user.set_password(serializer.validated_data['password1'])
        user.save(update_fields=['password'])
        return Response(serializer.data)
