from django.urls import path, include
from challenges import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# This is messy and should be refactored
urlpatterns = format_suffix_patterns(
    [
        path("api/challenge/", views.ChallengeList.as_view(), name="challenge-list")
    ]
)
