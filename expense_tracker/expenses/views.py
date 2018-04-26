from django.contrib.auth import get_user_model
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.conf import settings

from expenses.models import Expense
from expenses.serializers import UserSerializer, ExpenseSerializer
from expenses.permissions import RolePermission

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

UserModel = get_user_model()

class ExpenseViewSet(viewsets.ModelViewSet):
    """
    DRF ViewSet for listing and CRUD operations on expenses.
    """
    permission_classes = (IsAuthenticated, )
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return self.request.user.expenses.all()

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user.id)

class UserViewSet(viewsets.ModelViewSet):
    """
    DRF ViewSet for listing and CRUD operations on users.
    """
    queryset = UserModel.objects.all()
    permission_classes = (IsAuthenticated, RolePermission)
    serializer_class = UserSerializer
    allowed_groups = (
        settings.ACCESS_GROUPS_MANAGER,
        settings.ACCESS_GROUPS_ADMIN
    )
