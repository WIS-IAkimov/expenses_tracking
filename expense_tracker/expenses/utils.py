def has_permission(user, allowed_roles):
    user_groups = set(user.groups.values_list('name', flat=True))
    return len(user_groups.intersection(allowed_roles)) > 0
