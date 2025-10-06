from idlelib.debugobj_r import remote_object_tree_item

from django.core.serializers import serialize
from django.db.models.fields import return_None
from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from watchlist_app.api.v1.serializers import WatchListSerializer, StreamPlatformSerializer
from watchlist_app.models import WatchList, StreamPlatform


# Create your views here.

class MovieListAV(APIView):
    def get(self,request):
        movies = WatchList.objects.all()
        serializer = WatchListSerializer(movies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self,request):
        serializer = WatchListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class MovieDetailAV(APIView):
    def get(self,request,pk):
        movie = get_object_or_404(WatchList, id=pk)
        serializer = WatchListSerializer(movie)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def put(self,request, pk):
        movie = get_object_or_404(WatchList, id=pk)
        serializer = WatchListSerializer(movie, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def patch (self,request, pk):
        movie = get_object_or_404(WatchList,id=pk)
        serializer = WatchListSerializer(movie,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete (self, request, pk):
        movie = get_object_or_404(WatchList, id=pk)
        movie.delete()
        return Response({"message": "Movie Deleted"}, status=status.HTTP_204_NO_CONTENT)
class StreamPlatformAV(APIView):
    def get(self,request):
        platforms = StreamPlatform.objects.all()
        serializer = StreamPlatformSerializer(platforms,many=True, context={'request': request})
        return Response(serializer.data)
    def post(self,request):
        serializer = StreamPlatformSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
class StreamPlatformDetailAV(APIView):
    def get(self,request,pk):
        platforms = get_object_or_404(StreamPlatform,id=pk)
        serializer = StreamPlatformSerializer(platforms, context={'request': request})
        return Response(serializer.data)
    def put(self,request,pk):
        platform = get_object_or_404(StreamPlatform, id=pk)
        serializer = StreamPlatformSerializer(platform, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    def patch(self,request,pk):
        platform = get_object_or_404(StreamPlatform,id=pk)
        serializer = StreamPlatformSerializer(platform, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    def delete(self,request,pk):
        platform = get_object_or_404(StreamPlatform,id=pk)
        platform.delete()
        return Response({"message":"platform deleted"})
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