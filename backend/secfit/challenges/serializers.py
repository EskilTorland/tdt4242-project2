from rest_framework import serializers
from rest_framework.serializers import HyperlinkedRelatedField
from challenges.models import Challenge, ChallengeFile

class ChallengeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Challenge
        fields = [
            "id",
            "name",
            "start_date",
            "end_date",
            "description"
        ]