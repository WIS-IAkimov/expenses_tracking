from rest_framework import permissions

from expenses import utils


class RolePermission(permissions.BasePermission):
    """
    Role permission check.
    """

    def has_permission(self, request, view):
        return utils.has_permission(request.user, view.allowed_groups)


class UnAuthenticated(permissions.BasePermission):

    def has_permission(self, request, view):
        return not request.user.is_authenticated
