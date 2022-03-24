from django.test import TestCase, RequestFactory
from users.serializers import UserSerializer
from rest_framework import serializers

# Create your tests here.

class UserSerializerTest(TestCase):

    def setUp(self):
        self.password = 'hunter2isthestrongestpassword'

    def test_validate_password(self):
        serializer = UserSerializer(data ={'password':self.password,'password1':self.password})

        validated_password = serializer.validate_password(self.password)
        self.assertEqual(validated_password,self.password)
    
    def test_validate_password_fail(self):
        serializer = UserSerializer(data ={'password':self.password,'password1':'wrongpassword'})

        self.assertRaises(serializers.ValidationError,serializer.validate_password,self.password)

    def test_user_create(self):
        data = {
            'username' : 'John Doe',
            'email':'test@gmail.com',
            'password' : self.password,
            'phone_number': 12121212,
            'country': 'Sweden',
            'city' : 'Stockholm',
            'street_address' : 'Tre kronor' 
        }

        serializer = UserSerializer(data = data)
        test_user = serializer.create(data)

        self.assertEqual(test_user.username,data['username'])
        self.assertEqual(test_user.email,data['email'])
        self.assertEqual(test_user.phone_number,data['phone_number'])
        self.assertEqual(test_user.country,data['country'])
        self.assertEqual(test_user.city,data['city'])
        self.assertEqual(test_user.street_address,data['street_address'])
        

