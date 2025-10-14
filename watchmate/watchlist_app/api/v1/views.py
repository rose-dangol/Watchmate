from http.cookiejar import user_domain_match

from django.core.serializers import serialize
from django.db.models.fields import return_None
from django.shortcuts import render, get_object_or_404
from django.template.base import kwarg_re
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, mixins, request, filters
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.generics import GenericAPIView, ListAPIView, CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView, ListCreateAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle, ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.viewsets import GenericViewSet

from user_app.api.v1.throttling import ReviewListThrottle
from watchlist_app.api.v1.permissions import *
from watchlist_app.api.v1.serializers import WatchListSerializer, StreamPlatformSerializer, ReviewSerializer
from watchlist_app.models import WatchList, StreamPlatform, Review
from rest_framework.exceptions import ValidationError

#APIViews
# class MovieListAV(APIView):
#     def get(self,request):
#         movies = WatchList.objects.all()
#         serializer = WatchListSerializer(movies, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     def post(self,request):
#         serializer = WatchListSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class MovieDetailAV(APIView):
#     def get(self,request,pk):
#         movie = get_object_or_404(WatchList, id=pk)
#         serializer = WatchListSerializer(movie)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     def put(self,request, pk):
#         movie = get_object_or_404(WatchList, id=pk)
#         serializer = WatchListSerializer(movie, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     def patch (self,request, pk):
#         movie = get_object_or_404(WatchList,id=pk)
#         serializer = WatchListSerializer(movie,data=request.data,partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     def delete (self, request, pk):
#         movie = get_object_or_404(WatchList, id=pk)
#         movie.delete()
#         return Response({"message": "Movie Deleted"}, status=status.HTTP_204_NO_CONTENT)

# class StreamPlatformDetailAV(APIView):
#     def get(self,request,pk):
#         platforms = get_object_or_404(StreamPlatform,id=pk)
#         serializer = StreamPlatformSerializer(platforms, context={'request': request})
#         return Response(serializer.data)
#     def put(self,request,pk):
#         platform = get_object_or_404(StreamPlatform, id=pk)
#         serializer = StreamPlatformSerializer(platform, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors)
#     def patch(self,request,pk):
#         platform = get_object_or_404(StreamPlatform,id=pk)
#         serializer = StreamPlatformSerializer(platform, data=request.data,partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors)
#     def delete(self,request,pk):
#         platform = get_object_or_404(StreamPlatform,id=pk)
#         platform.delete()
#         return Response({"message":"platform deleted"})

# class StreamPlatformAV(APIView):
#     def get(self,request):
#         platforms = StreamPlatform.objects.all()
#         serializer = StreamPlatformSerializer(platforms,many=True, context={'request': request})
#         return Response(serializer.data)
#     def post(self,request):
#         serializer = StreamPlatformSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors)

#Generic Views

#MovieList ko GENERIC VIEWS
class MovieList(GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = WatchList.objects.all()
    serializer_class = WatchListSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    ordering_fields = ['id']

    # def get_queryset(self,*args,**kwargs):
    #     if self.action=='list':
    #         return WatchList.objects.filter(title=self.kwargs.get('title'))
    #     return WatchList.objects.all()

    def get(self, *args, **kwargs):
        return self.list(*args, **kwargs)
    # def get(self,request, *args, **kwargs):
    #     # print(args)
    #     # print(kwargs)
    #     title= kwargs.get('title')
    #     return self.list(request,*args,**kwargs)
    def post(self, request, *args, **kwargs):
        return self.create(request,*args,**kwargs)

class MovieDetail(GenericAPIView, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = WatchList.objects.all()
    serializer_class = WatchListSerializer
    def get(self,request,*args,**kwargs):
        return self.retrieve(request,*args,**kwargs)
    def put(self,request,*args,**kwargs):
        return self.update(request,*args,**kwargs)
    def patch(self,request,*args,**kwargs):
        return self.partial_update(request,*args,**kwargs)
    def delete(self,request,*args,**kwargs):
        return self.destroy(request,*args,**kwargs)

#stream platform ko MODEL VIEWSET
class StreamPlatformModelViewSet(viewsets.ModelViewSet):
    queryset = StreamPlatform.objects.all()
    serializer_class = StreamPlatformSerializer
    #get_queryset garera override garni
    #action anusar le different queryset dekhauni vaye:
    # def get_queryset(self):
    #     if self.action == 'list':
    #         return StreamPlatform.objects.filter(name__startswith='N')
    #     elif self.action == 'retrieve':
    #         return StreamPlatform.objects.all()

'''stream platform ko GenericView'''
# class StreamPlatforms(GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
#     queryset = StreamPlatform.objects.all()
#     serializer_class = StreamPlatformSerializer
#     def get(self,request,*args,**kwargs):
#         return self.list(request,*args,**kwargs)
#     def post(self,request,*args,**kwargs):
#         return self.create(request,*args,**kwargs)
#
# class StreamPlatformDetail(GenericAPIView, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
#     queryset = StreamPlatform.objects.all()
#     serializer_class = StreamPlatformSerializer
#     def get(self,request,*args,**kwargs):
#         return self.retrieve(request,*args,**kwargs)
#     def put(self,request,*args,**kwargs):
#         return self.update(request,*args,**kwargs)
#     def patch(self,request,*args,**kwargs):
#         return self.partial_update(request,*args,**kwargs)
#     def delete(self,request,*args,**kwargs):
#         return self.destroy(request,*args,**kwargs)


class ReviewModelViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    # permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['rating', 'active','user__username','watchlist__title','watchlist__id']
    search_fields = ['username',]

    # def get_queryset(self):
    #     user = self.request.user
    #     rating = self.request.query_params.get('rating')
    #     username = self.request.query_params.get('username')
    #     return Review.objects.filter(rating=rating, user__username = username)
       # return Review.objects.filter(user=user)

    # throttle_classes = [AnonRateThrottle,UserRateThrottle]

    # def get_throttles(self):
    #     if self.action== 'list':
    #         return [ReviewListThrottle()]
    #     return [UserRateThrottle(),AnonRateThrottle()]

    # throttle_scope = "review-list"
    # def get_throttles(self):
    #     if self.action== 'list':
    #         return [ScopedRateThrottle()]
    #     return [UserRateThrottle(),AnonRateThrottle()]

    # permission_classes = [IsAuthenticated, IsReviewUserOrReadOnly]  #order anusar lincha #genric api view bata aako huncha
    #BasePermission lai inherit and has_permission lai override garni for custom permission
    def perform_create(self, serializer):
        user= self.request.user
        watchlist = serializer.validated_data['watchlist']

        if Review.objects.filter(user=user, watchlist=watchlist).exists():
            raise ValidationError("Review Already Exists!")
        return serializer.save(user=user)

'''Review ko ViewSet'''
# class ReviewListViewSet(viewsets.ViewSet): #euta class ma multiple views + direct routing banauni
#     def list(self,request):
#         # queryset = Review.objects.filter(active=True)
#         queryset = Review.objects.all()
#         serializer= ReviewSerializer(queryset,many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     def retrieve(self,request,pk):
#         obj = get_object_or_404(Review,pk=pk)
#         serializer = ReviewSerializer(obj)
#         return Response(serializer.data,status=status.HTTP_200_OK)
#     def create(self,request):

'''Concrete API View'''
# class ReviewListAPIView(ListCreateAPIView):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer
# class ReviewDetail(RetrieveUpdateDestroyAPIView):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer

'''ReviewList koGENERIC VIEW'''
# class ReviewList(mixins.ListModelMixin,mixins.CreateModelMixin,GenericAPIView):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer
#     def get(self,*args,**kwargs):
#         return self.list(self,*args,**kwargs)
#     def post(self,request,*args,**kwargs):
#         return self.create(request,*args, **kwargs)

# class ReviewDetail(mixins.DestroyModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericAPIView):
#     queryset = Review.objects.all()
#     serializer_class = ReviewSerializer
#     def get(self,*args,**kwargs):
#         print("Args", args)
#         return self.retrieve(request, *args, **kwargs)
#     def put(self,request,*args,**kwargs):
#         return self.update(request, *args, **kwargs)
#     def patch(self,request,*args, **kwargs):
#
#         return self.partial_update(request, *args, **kwargs)
#     def delete(self,request,*args,**kwargs):
#         return self.destroy(request, *args, **kwargs)

'''ReviewList ko API view'''
# class ReviewListAV(APIView):
#     def get(self,request):
#         reviews= Review.objects.all()
#         serializer = ReviewSerializer(reviews, many=True)
#         return Response(serializer.data)
#     def post(self,request,id):
#         serializer = ReviewSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         else:
#             return Response(serializer.errors)


'''Simple view only'''
# @api_view(['GET', 'POST'])
# def movie_list(request):
#     if request.method.lower()=='get':
#         print(type(request))
#         movies = Movie.objects.all()
#         serializer = MovieSerializer(movies, many=True  )
#         print(serializer.data)
#         print(type(serializer.data))
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     if request.method.lower()=="post":
#         # print(request.data)
#         serializer = MovieSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # movies_dict= {"movies":list(movies.values())}
    # return JsonResponse(movies_dict)
# @api_view(['GET','PUT','PATCH','DELETE'])
# def movie_detail(request, pk):
#     if request.method.lower()=='get':
#         movie = get_object_or_404(Movie, id=pk)
#         serializer = MovieSerializer(movie)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     if request.method.lower()=='put':
#         movie = get_object_or_404(Movie,id=pk)
#         serializer = MovieSerializer(movie,data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     if request.method.lower()=='patch':
#         movie = get_object_or_404(Movie,id=pk)
#         serializer = MovieSerializer(movie,data=request.data,partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     if request.method.lower()=='delete':
#         movie = get_object_or_404(Movie,id=pk)
#         movie.delete()
#         return Response ({"message":"Movie Deleted"},status=status.HTTP_204_NO_CONTENT)
#     # print("Movie",movie)
#     # data = {"name":movie.name, "description":movie.description, "active":movie.active}
#     # return JsonResponse(data)