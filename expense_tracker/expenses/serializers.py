from rest_framework import serializers
from expenses.models import Expense


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Expense
        fields = ('id', 'name', 'password')

class ExpenseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Expense
        fields = ('id', 'date', 'time', 'description', 'amount', 'comment')
