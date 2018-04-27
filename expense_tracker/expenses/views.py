from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters import rest_framework as filters
from rest_framework_jwt.settings import api_settings

from expenses import serializers as app_serializers, utils
from expenses.filters import ExpensesFilter
from expenses.models import Expense
from expenses.permissions import RolePermission, UnAuthenticated

UserModel = get_user_model()


class ExpenseViewSet(viewsets.ModelViewSet):
    """
    DRF ViewSet for listing and CRUD operations on expenses.
    """
    USER_FILTER_KEY = 'user'
    permission_classes = (IsAuthenticated,)
    serializer_class = app_serializers.ExpenseSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = ExpensesFilter

    def get_queryset(self):
        if utils.has_permission(self.request.user, (
                settings.ACCESS_GROUPS_ADMIN,)):
            if self.USER_FILTER_KEY in self.request.query_params:
                return Expense.objects.all()
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

    @action(serializer_class=app_serializers.UserSerializer,
            permission_classes=(IsAuthenticated,),
            methods=['post'], detail=False, url_path='current',
            url_name='current')
    def current_user_detail(self, request, pk, *args, **kwargs):
        serializer = self.get_serializer(instance=request.user)
        return Response(serializer.data)

    @action(serializer_class=app_serializers.UserRegistrationSerializer,
            permission_classes=(UnAuthenticated,),
            methods=['post'], detail=False, url_path='registration',
            url_name='registration')
    def registration(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(instance)
        token = jwt_encode_handler(payload)
        return Response({'token': token})

    @action(serializer_class=app_serializers.UserLoginSerializer,
            permission_classes=(UnAuthenticated,),
            methods=['post'], detail=False)
    def login(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        user_serializer = app_serializers.UserSerializer(instance=user)
        return Response({
            'token': token,
            'user': user_serializer.data
        })
