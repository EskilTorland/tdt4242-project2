from django.test import TestCase
from django.test import RequestFactory
from users.models import User

from workouts.permissions import IsOwner, IsOwnerOfWorkout, IsCoachAndVisibleToCoach, IsCoachOfWorkoutAndVisibleToCoach, IsPublic, IsWorkoutPublic, IsReadOnly
from workouts.models import Workout, Exercise, ExerciseInstance


class TestIsOWner(TestCase):
    def setUp(self):
        self.user1 = User.objects.create(username="user1")
        self.user2 = User.objects.create(username="user2", coach=self.user1)
        self.factory = RequestFactory()
        self.is_owner_check = IsOwner()

    def test_is_owner(self):
        request = self.factory.get('/')
        request.user = self.user1
        workout = Workout.objects.create(name="Workout", date="2022-03-05T12:00:00Z", notes="Notes", owner=self.user1, visibility="PU")
    
        permission = self.is_owner_check.has_object_permission(request, None, workout)
        self.assertTrue(permission)

#class TestIsOwnerOfWorkout(TestCase):

#class TestIsCoachAndVisibleToCoach(TestCase):

#class TestIsPublic(TestCase):

#class TestIsWorkoutPublic(TestCase):

#class TestIsReadOnly(TestCase):