from django.test import TestCase, RequestFactory
from users.serializers import UserSerializer
from chance import chance

# Create your tests here.

class UserSerializerTest(TestCase):

    def test_validate_password(self):
        password = 'password123'
        serializer = UserSerializer(data ={'password123':password,'password':password})

        validated_password = serializer.validate_password(password)
        self.assertEqual(validated_password,password)
    
    def test_validate_password_fail(self):
        password = 'password123'
        serializer = UserSerializer(data ={'password123':password,'password':'nomatch'})

        self.assertRaises(serializer.ValidationError,serializer.validate_password,password)

    def test_user_create(self):
        data = {
            'username' : 'John Doe',
            'email':'test@gmail.com',
            'password' : 'hunter2',
            'phone_number': 12121212,
            'country': 'Sweden',
            'city' : 'Stockholm',
            'address' : 'Tre kronor' 
        }

        serializer = UserSerializer(data = data)
        test_user = serializer.create(data)

        self.assertEqual(test_user.username,data['username'])
        self.assertEqual(test_user.email,data['email'])
        self.assertEqual(test_user.phone_number,data['phone_number'])
        self.assertEqual(test_user.country,data['country'])
        self.assertEqual(test_user.city,data['city'])
        self.assertEqual(test_user.address,data['address'])
        

