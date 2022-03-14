"""Contains the models for the meals Django application. Users
log meals (Meal). The user can also upload files (MealFile) .
"""
import os
from django.db import models
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from django.contrib.auth import get_user_model


class OverwriteStorage(FileSystemStorage):
    """Filesystem storage for overwriting files. Currently unused."""

    def get_available_name(self, name, max_length=None):
        """https://djangosnippets.org/snippets/976/
        Returns a filename that's free on the target storage system, and
        available for new content to be written to.

        Args:
            name (str): Name of the file
            max_length (int, optional): Maximum length of a file name. Defaults to None.
        """
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))


# Create your models here.
class Challenge(models.Model):
    """Django model for a meal that users can log.

    A meal has several attributes, and files uploaded by the user.

    Attributes:
        name:         Name of the challenge
        start_date:   Date and time the challenge started/starts
        end_date:     Date and time the challenge ends
        description:  The description of the challenge
    """

    name = models.CharField(max_length=100)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    description = models.TextField()

    def __str__(self):
        return self.name

def Challenge_directory_path(instance, filename):
    """Return path for which meal files should be uploaded on the web server

    Args:
        instance (MealFile): MealFile instance
        filename (str): Name of the file

    Returns:
        str: Path where workout file is stored
    """
    return f"challenges/{instance.challenge.id}/{filename}"

class ChallengeFile(models.Model):
    """Django model for file associated with a meal. Basically a wrapper.

    Attributes:
        meal:    The meal for which this file has been uploaded
        owner:   The user who uploaded the file
        file:    The actual file that's being uploaded
    """

    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE, related_name="files")
    file = models.FileField(upload_to=Challenge_directory_path)
