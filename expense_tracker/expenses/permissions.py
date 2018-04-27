from rest_framework import permissions


class RolePermission(permissions.BasePermission):
    """
    Role permission check.
    """

    def has_permission(self, request, view):
        user_groups = set(request.user.groups.values_list('name', flat=True))
        return len(user_groups.intersection(view.allowed_groups)) > 0
