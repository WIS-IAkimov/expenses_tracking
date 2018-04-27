from django.conf import settings
from django.contrib.auth import get_user_model, authenticate
from django.db import transaction
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from expenses.models import Expense

UserModel = get_user_model()


class UserLoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(request=self.context['request'],
                            username=attrs['username'],
                            password=attrs['password'])
        if user is None:
            raise serializers.ValidationError({
                'username': _('Incorrect username/password'),
                'password': _('Incorrect username/password'),
            })
        return user


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,
                                     validators=[validate_password])

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data['password'] = ''
        obj = super(UserRegistrationSerializer, self).create(validated_data)
        obj.set_password(password)
        obj.save(update_fields=['password'])
        return obj

    class Meta:
        model = UserModel
        fields = (
            'id', 'username', 'first_name', 'last_name', 'password'
        )


class UserPasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    password1 = serializers.CharField()
    password2 = serializers.CharField()

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        super(UserPasswordSerializer, self).__init__(*args, **kwargs)

    def validate(self, attrs):
        user = self.user
        if not user.check_password(attrs['old_password']):
            raise serializers.ValidationError({
                'old_password': _('Password was not matched')
            })
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError({
                'password1': _('Passwords are not equal'),
                'password2': _('Passwords are not equal')
            })
        validate_password(attrs['password1'], user=user)
        return attrs


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    role = serializers.SerializerMethodField(read_only=True)

    def get_role(self, obj):
        role = obj.groups.last()
        role_name = settings.ACCESS_GROUPS_USER
        if role:
            role_name = role.name
        return role_name.lower()

    @transaction.atomic
    def validate(self, attrs):
        if not self.instance:
            password = attrs.get('password', '')
            validate_password(password)
            return attrs
        attrs.pop('password', None)
        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(password)
        user.save(update_fields=['password'])
        return user

    class Meta:
        model = UserModel
        fields = (
            'id', 'username', 'first_name', 'last_name', 'password', 'role'
        )


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ('id', 'created_at', 'description', 'amount', 'comment')
