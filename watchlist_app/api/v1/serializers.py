from rest_framework import serializers
from watchlist_app.models import WatchList, StreamPlatform, Review

def check_len(value):
    if len(value) < 3:
        raise serializers.ValidationError("Must be at least 3 character")

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class WatchListSerializer(serializers.ModelSerializer):
    name_length = serializers.SerializerMethodField()
    review_watchlist = ReviewSerializer(many=True, read_only=True)
    # review_watchlist = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = WatchList
        # fields = "__all__" sabai fields aucha
        # fields = ['title', 'storyline','active','created_at','name_length']
        exclude = ['active']
    def get_name_length(self, obj):
        return (len(obj.title))

class StreamPlatformSerializer(serializers.HyperlinkedModelSerializer):
    # watchlist_stream_platform = WatchListSerializer(many=True, read_only=True)
    watchlist_stream_platform = serializers.StringRelatedField(many=True, read_only=True)
    # watchlist_stream_platform = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # watchlist_stream_platform = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='movie-detail')
    # watchlist_stream_platform = serializers.SlugRelatedField(many=True, read_only=True, slug_field='title')
    class Meta:
        model = StreamPlatform
        # fields = ['id','name','about','website','watchlist_stream_platform']
        fields = '__all__'


    #method fields
# class MovieSerializer(serializers.Serializer):
#     name = serializers.CharField(max_length=100,validators=[check_len])
#     #field level, object level;-two or more fields compare,
#     # validators; same validation in multiple fields (like no special characters in name+description)
#     description = serializers.CharField(max_length=200,validators=[check_len])
#     active = serializers.BooleanField(default=True)
#
#     def create(self, validated_data):
#         return Movie.objects.create(**validated_data) #dictionary unpacking
#         print(validated_data)
#         return Movie.objects.create (name= validated_data['name'],
#                               description= validated_data['description'],
#                               active= validated_data['active'])
#
#     def update(self, instance, validated_data):
#         instance.name = validated_data.get('name', instance.name)
#         instance.description = validated_data.get('description',instance.description)
#         instance.active = validated_data.get('active', instance.active)
#         instance.save()
#         return instance
#
#     #field level validation
#     def validate_name(self, value):
#         if not value[0].isupper():
#             raise serializers.ValidationError("First Character must be uppercase")
#         else:
#             return value
#
#     #object level validation
#     def validate(self, attrs):
#         print(attrs)
#         if attrs['name'] == attrs['description']:
#             raise serializers.ValidationError("Movie name and description must not be same")
#         else:
#             return attrs
#
#     # def no_special_character(value):
#     #     if any(char in "!@#$%^&*()_" char of value)

