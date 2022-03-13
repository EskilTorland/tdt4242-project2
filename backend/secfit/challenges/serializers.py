from rest_framework import serializers
from rest_framework.serializers import HyperlinkedRelatedField
from challenges.models import Challenge, ChallengeFile

class ChallengeFileSerializer(serializers.HyperlinkedModelSerializer):
    Challenge = HyperlinkedRelatedField(
        queryset=Challenge.objects.all(), view_name="meal-detail", required=False
    )

    class Meta:
        model = ChallengeFile
        fields = ["url", "id", "file", "challenge", "description"]

    def create(self, validated_data):
        return ChallengeFile.objects.create(**validated_data)


class ChallengeSerializer(serializers.HyperlinkedModelSerializer):
    files = ChallengeFileSerializer(many=True, required=False)

    class Meta:
        model = Challenge
        fields = [
            "url",
            "id",
            "name",
            "start_date",
            "end_date",
            "description"
        ]

    def create(self, validated_data):
        files_data = []
        if "files" in validated_data:
            files_data = validated_data.pop("files")

        challenge = Challenge.objects.create(**validated_data)

        for file_data in files_data:
            ChallengeFile.objects.create(
                challenge=challenge, file=file_data.get("file")
            )

        return challenge

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.start_date = validated_data.get("start_date", instance.start_date)
        instance.end_date = validated_data.get("end_date", instance.end_date)
        instance.description = validated_data.get("description", instance.description)
        instance.save()

        if "files" in validated_data:
            files_data = validated_data.pop("files")
            files = instance.files

            for file, file_data in zip(files.all(), files_data):
                file.file = file_data.get("file", file.file)

            if len(files_data) > len(files.all()):
                for i in range(len(files.all()), len(files_data)):
                    ChallengeFile.objects.create(
                        challenge=instance,
                        file=files_data[i].get("file"),
                    )
            elif len(files_data) < len(files.all()):
                for i in range(len(files_data), len(files.all())):
                    files.all()[i].delete()

        return instance