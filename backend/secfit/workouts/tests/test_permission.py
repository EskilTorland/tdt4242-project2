from django.test import TestCase, RequestFactory, Client
from workouts.permissions import IsOwner, IsOwnerOfWorkout, IsCoachAndVisibleToCoach, IsCoachOfWorkoutAndVisibleToCoach, IsPublic, IsWorkoutPublic, IsReadOnly
from workouts.models import Workout, Exercise, ExerciseInstance
from users.models import User
import json
# Create your tests here.
class IsOwnerTest(TestCase):
  def setUp(self):
    self.user = User.objects.create(username="testuser")
    self.workout = Workout.objects.create(name="Chest Day", date="2022-03-05T08:00:00Z", notes="Max Day", owner=self.user, visibility="PU")

  def test_user_is_owner(self):
    request = RequestFactory().get('/')
    request.user = self.user
    
    self.assertTrue(IsOwner().has_object_permission(request,None,self.workout))

class IsOwnerOfWorkoutTest(TestCase):
  def setUp(self):
    self.user = User.objects.create(username="testuser")
    self.workout = Workout.objects.create(name="Back Day", date="2022-03-08T08:00:00Z", notes="60% max", owner=self.user, visibility="PU")

  def test_is_user_owner_of_workout(self):
    request = RequestFactory().get('/')
    request.user = self.user
    exercise = Exercise.objects.create(name="Pull-ups", description="Bar to chin", unit="repititions")
    excercise_instance = ExerciseInstance.objects.create(workout=self.workout, exercise=exercise, sets=3, number=8)
    
    self.assertTrue(IsOwnerOfWorkout().has_object_permission(request,None,excercise_instance))

  def test_get_is_user_owner_of_workout(self):
    request = RequestFactory().get('/')
    request.user = self.user
    request.data = { 'workout' : '/api/workouts/1/'}
    
    self.assertTrue(IsOwnerOfWorkout().has_permission(request,None))

  def test_post_is_user_owner_of_workout(self):
    request = RequestFactory().post('/')
    request.user = self.user
    request.data = { 'workout' : '/api/workouts/1/'}

    self.assertTrue(IsOwnerOfWorkout().has_permission(request,None))

  def test_is_user_owner_of_workout_post_empty_workout(self):
    request = RequestFactory().post('/')
    request.user = self.user
    request.data = { 'workout' : None}
    self.assertFalse(IsOwnerOfWorkout().has_permission(request,None))

class IsCoachAndVisibleToCoachTest(TestCase):
  def setUp(self):
    self.coach = User.objects.create(username="testcoach")
    self.user = User.objects.create(username="testuser", coach=self.coach)
    self.workout = Workout.objects.create(name="Leg Day", date="2022-03-08T08:00:00Z", notes="1 rep max", owner=self.user, visibility="PU")

  def test_user_is_coach_and_visible_to_coach(self):
    request = RequestFactory().get('/')
    request.user = self.coach
    
    self.assertTrue(IsCoachAndVisibleToCoach().has_object_permission(request,None,self.workout))


class IsCoachOfWorkoutAndVisibleToCoachTest(TestCase):
  def setUp(self):
    self.coach = User.objects.create(username="testcoach")
    self.user = User.objects.create(username="testuser", coach=self.coach)
    self.workout = Workout.objects.create(name="Leg Day", date="2022-03-08T08:00:00Z", notes="1 rep max", owner=self.user, visibility="PU")
  def test_is_user_coach_of_workout_and_visible_to_coach(self):
    request = RequestFactory().get('/')
    request.user = self.coach
    exercise = Exercise.objects.create(name="Squats", description="1 rep max", unit="repititions")
    excercise_instance = ExerciseInstance.objects.create(workout=self.workout, exercise=exercise, sets=1, number=1)
    
    self.assertTrue(IsCoachOfWorkoutAndVisibleToCoach().has_object_permission(request,None,excercise_instance))

class IsPublicTest(TestCase):
  def setUp(self):
    self.coach = User.objects.create(username="testcoach")
    self.user = User.objects.create(username="testuser", coach=self.coach)
    self.workout = Workout.objects.create(name="Leg Day", date="2022-03-08T08:00:00Z", notes="1 rep max", owner=self.user, visibility="PU")
  def test_is_workout_public(self):
    request = RequestFactory().get('/')
    request.user = self.coach
    
    self.assertTrue(IsPublic().has_object_permission(request,None,self.workout))


class IsWorkoutPublicTest(TestCase):
  def setUp(self):
    self.coach = User.objects.create(username="testcoach")
    self.user = User.objects.create(username="testuser", coach=self.coach)
    self.workout = Workout.objects.create(name="Back Day", date="2022-03-08T08:00:00Z", notes="60% max", owner=self.user, visibility="PU")

    

  def test_is_excercise_with_workout_public(self):
    request = RequestFactory().get('/')
    request.user = self.coach
    exercise = Exercise.objects.create(name="Pull-ups", description="With added weights", unit="repititions")
    excercise_instance = ExerciseInstance.objects.create(workout=self.workout, exercise=exercise, sets=5, number=5)
    
    self.assertTrue(IsWorkoutPublic().has_object_permission(request,None,excercise_instance))


class IsReadOnlyTest(TestCase):
  def setUp(self):
    self.coach = User.objects.create(username="testcoach")
    self.user = User.objects.create(username="testuser", coach=self.coach)
    self.workout = Workout.objects.create(name="Back Day", date="2022-03-08T08:00:00Z", notes="60% max", owner=self.user, visibility="PU")

  def test_is_workout_read_only(self):
    request = RequestFactory().get('/')
    request.user = self.coach

    self.assertTrue(IsReadOnly().has_object_permission(request,None,self.workout))
