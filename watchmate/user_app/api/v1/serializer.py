from django.contrib.auth.models import User
from rest_framework import serializers


class UserRegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={'input':'password'}, write_only=True)
    #deisplay token pani
    # display_token = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('username','email','password','confirm_password')
        extra_kwargs = {'password':{'write_only':True}}

    def create(self, validated_data):   #remove confirm password ra password lai hash gareko
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Password od not match")
        return attrs