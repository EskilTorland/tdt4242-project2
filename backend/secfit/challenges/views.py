"""Contains views for the meals application. These are mostly class-based views.
"""
from rest_framework import generics, mixins
from rest_framework import permissions

from rest_framework.parsers import (
    JSONParser,
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.db.models import Q
from rest_framework import filters
from challenges.models import Challenge, ChallengeFile
from challenges.serializers import ChallengeSerializer
from rest_framework.response import Response
import json
from collections import namedtuple
import base64, pickle
from django.core.signing import Signer


@api_view(["GET"])
def api_root(request, format=None):
    return Response(
        {
            'challenges': reverse('challenge-list', request=request, format=format)
        }
    )

class ChallengeList(
    mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView
):
    """Class defining the web response for the creation of an Goal, or
    a list of Goals.

    HTTP methods: GET, POST
    """

    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, kwargs):
        return self.list(request, *args, kwargs)

    def post(self, request, *args, kwargs):
        return self.create(request, *args, kwargs)


class ChallengeDetail(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView,
):
    """Class defining the web response for the details of an individual Goal.

    HTTP methods: GET, PUT, PATCH, DELETE
    """

    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, kwargs):
        return self.retrieve(request, *args, kwargs)

    def put(self, request, *args, kwargs):
        return self.update(request, *args, kwargs)

    def patch(self, request, *args, kwargs):
        return self.partial_update(request, *args, kwargs)

    def delete(self, request, *args, kwargs):
        return self.destroy(request, *args, kwargs)