from django.contrib import admin

# Register your models here.

from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'first_name', 'last_name','is_staff','phone_number','address', 'is_active')
    list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password')}
        ),
    )
    search_fields = ('email','first_name','last_name','phone_number')
    ordering = ('email',)


admin.site.register(User, CustomUserAdmin)