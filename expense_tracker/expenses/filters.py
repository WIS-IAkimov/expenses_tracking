import django_filters
from django.db.models import Q

from expenses.models import Expense


class ExpensesFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_by_text',
                                       label='Search string')
    amount_from = django_filters.NumberFilter(name='amount', lookup_expr='gte')
    amount_to = django_filters.NumberFilter(name='amount', lookup_expr='lte')
    created_from = django_filters.DateTimeFilter(name='created_at',
                                                 lookup_expr='gte')
    created_to = django_filters.DateTimeFilter(name='created_at',
                                               lookup_expr='lte')

    def filter_by_text(self, queryset, value, name):
        return queryset.filter(
            Q(comment__icontains=value) | Q(description__icontains=value)
        ).distinct()

    class Meta:
        model = Expense
        fields = (
            'amount_from', 'amount_to', 'search', 'created_from', 'created_to'
        )
