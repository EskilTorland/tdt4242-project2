from django.test import TestCase, RequestFactory, Client
from workouts.permissions import IsOwner, IsOwnerOfWorkout, IsCoachAndVisibleToCoach, IsCoachOfWorkoutAndVisibleToCoach, IsPublic, IsWorkoutPublic, IsReadOnly
from workouts.models import Workout, Exercise, ExerciseInstance
from users.models import User
import json
# Create your tests here.
class IsOwnerTest(TestCase):
  def setUp(self):
    self.user1 = User.objects.create(username="user1")
    self.user2 = User.objects.create(username="user2", coach=self.user1)
    self.factory = RequestFactory()
    self.is_owner_check = IsOwner()

  def test_is_owner(self):
    request = self.factory.get('/')
    request.user = self.user1
    workout = Workout.objects.create(name="Workout", date="2021-03-05T12:00:00Z", notes="Notes", owner=self.user1, visibility="PU")
    
    permission = self.is_owner_check.has_object_permission(request, None, workout)
    self.assertTrue(permission)

class IsOwnerOfWorkoutTest(TestCase):
  def setUp(self):
    self.user1 = User.objects.create(username="user1")
    self.user2 = User.objects.create(username="user2", coach=self.user1)
    self.factory = RequestFactory()
    self.is_owner_of_workout_check = IsOwnerOfWorkout()
    self.workout = Workout.objects.create(name="Workout", date="2021-03-05T12:00:00Z", notes="Notes", owner=self.user1, visibility="PU")

  def test_is_owner_of_workout_obj(self):
    request = self.factory.get('/')
    request.user = self.user1
    exercise = Exercise.objects.create(name="Pull-ups", description="Pull-ups", unit="Times")
    instance = ExerciseInstance.objects.create(workout=self.workout, exercise=exercise, sets=10, number=10)
    
    permission = self.is_owner_of_workout_check.has_object_permission(request, None, instance)
    self.assertTrue(permission)

  def test_is_owner_of_workout_get(self):
    request = self.factory.get('/')
    request.user = self.user1
    request.data = { 'workout' : '/api/workouts/1/'}
    
    permission = self.is_owner_of_workout_check.has_permission(request, None)
    self.assertTrue(permission)

  def test_is_owner_of_workout_post(self):
    request = self.factory.post('/')
    request.user = self.user1
    request.data = { 'workout' : '/api/workouts/1/'}
    permission = self.is_owner_of_workout_check.has_permission(request, None)
    self.assertTrue(permission)

  def test_is_owner_of_workout_post_no_workout(self):
    request = self.factory.post('/')
    request.user = self.user1
    request.data = { 'workout' : None}
    permission = self.is_owner_of_workout_check.has_permission(request, None)
    self.assertFalse(permission)

class IsCoachAndVisibleToCoachTest(TestCase):
  def setUp(self):
    self.user1 = User.objects.create(username="user1")
    self.user2 = User.objects.create(username="user2", coach=self.user1)
    self.factory = RequestFactory()
    self.is_coach_and_visible_to_coach_check = IsCoachAndVisibleToCoach()
    self.workout = Workout.objects.create(name="Workout", date="2021-03-05T12:00:00Z", notes="Notes", owner=self.user2, visibility="PU")

  def test_is_coach_and_visible_to_coach(self):
    request = self.factory.get('/')
    request.user = self.user1
    
    permission = self.is_coach_and_visible_to_coach_check.has_object_permission(request, None, self.workout)
    self.assertTrue(permission)


class IsCoachOfWorkoutAndVisibleToCoachTest(TestCase):
  def setUp(self):
    self.user1 = User.objects.create(username="user1")
    self.user2 = User.objects.create(username="user2", coach=self.user1)
    self.factory = RequestFactory()
    self.is_coach_of_workout_and_visible_to_coach_check = IsCoachOfWorkoutAndVisibleToCoach()
    self.workout = Workout.objects.create(name="Workout", date="2021-03-05T12:00:00Z", notes="Notes", owner=self.user2, visibility="PU")

  def test_is_coach_of_workout_and_visible_to_coach(self):
    request = self.factory.get('/')
    request.user = self.user1
    exercise = Exercise.objects.create(name="Pull-ups", description="Pull-ups", unit="Times")
    instance = ExerciseInstance.objects.create(workout=self.workout, exercise=exercise, sets=10, number=10)
    
    permission = self.is_coach_of_workout_and_visible_to_coach_check.has_object_permission(request, None, instance)
    self.assertTrue(permission)

class IsPublicTest(TestCase):
  def setUp(self):
    self.user1 = User.objects.create(username="user1")
    self.user2 = User.objects.create(username="user2", coach=self.user1)
    self.factory = RequestFactory()
    self.is_public_check = IsPublic()
    self.workout = Workout.objects.create(name="Workout", date="2021-03-05T12:00:00Z", notes="Notes", owner=self.user2, visibility="PU")

  def test_is_coach_of_workout_and_visible_to_coach(self):
    request = self.factory.get('/')
    request.user = self.user1
    
    permission = self.is_public_check.has_object_permission(request, None, self.workout)
    self.assertTrue(permission)


class IsWorkoutPublicTest(TestCase):
  def setUp(self):
    self.user1 = User.objects.create(username="user1")
    self.user2 = User.objects.create(username="user2", coach=self.user1)
    self.factory = RequestFactory()
    self.is_workout_public_check = IsWorkoutPublic()
    self.workout = Workout.objects.create(name="Workout", date="2021-03-05T12:00:00Z", notes="Notes", owner=self.user2, visibility="PU")

  def test_is_coach_of_workout_and_visible_to_coach(self):
    request = self.factory.get('/')
    request.user = self.user1
    exercise = Exercise.objects.create(name="Pull-ups", description="Pull-ups", unit="Times")
    instance = ExerciseInstance.objects.create(workout=self.workout, exercise=exercise, sets=10, number=10)

    permission = self.is_workout_public_check.has_object_permission(request, None, instance)
    self.assertTrue(permission)


class IsReadOnlyTest(TestCase):
  def setUp(self):
    self.user1 = User.objects.create(username="user1")
    self.user2 = User.objects.create(username="user2", coach=self.user1)
    self.factory = RequestFactory()
    self.is_read_only_check = IsReadOnly()
    self.workout = Workout.objects.create(name="Workout", date="2021-03-05T12:00:00Z", notes="Notes", owner=self.user2, visibility="PU")

  def test_is_coach_of_workout_and_visible_to_coach(self):
    request = self.factory.get('/')
    request.user = self.user1

    permission = self.is_read_only_check.has_object_permission(request, None, self.workout)
    self.assertTrue(permission)
