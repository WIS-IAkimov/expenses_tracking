import django_filters
from django.conf import settings
from django.db.models import Q

from expenses.models import Expense, User


class ExpensesFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_by_text',
                                       label='Search string')
    amount_from = django_filters.NumberFilter(name='amount', lookup_expr='gte')
    amount_to = django_filters.NumberFilter(name='amount', lookup_expr='lte')
    created_from = django_filters.DateFilter(name='created_at',
                                             lookup_expr='date__gte')
    created_to = django_filters.DateFilter(name='created_at',
                                           lookup_expr='date__lte')
    user = django_filters.NumberFilter(name='user', lookup_expr='exact')

    def filter_by_text(self, queryset, name, value):
        return queryset.filter(
            Q(comment__icontains=value) | Q(description__icontains=value)
        ).distinct()

    class Meta:
        model = Expense
        fields = (
            'amount_from', 'amount_to', 'search', 'created_from', 'created_to',
            'user'
        )


class UserFilter(django_filters.FilterSet):
    role = django_filters.ChoiceFilter(name='groups',
                                       choices=User.ROLE_CHOICES,
                                       lookup_expr='name',
                                       label='Role')

    class Meta:
        model = User
        fields = ('role',)
