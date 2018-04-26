from django.contrib import admin
from expenses.models import Expense

class ExpenseAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'time', 'description', 'amount')
admin.site.register(Expense, ExpenseAdmin)
