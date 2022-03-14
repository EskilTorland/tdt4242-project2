"""Module for registering models from meals app to admin page so that they appear
"""
from django.contrib import admin

# Register your models here.
from .models import Challenge

admin.site.register(Challenge)
