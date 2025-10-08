from django.urls import path

from watchlist_app.api.v1 import views

# from watchmate.urls import urlpatterns

urlpatterns = [
    path("list/", views.MovieList.as_view(), name='watch-list'),
    path("<int:pk>/", views.MovieDetail.as_view(), name='movie-detail'),

    path('stream/', views.StreamPlatforms.as_view(),name='platform-list'),
    path("stream/<int:pk>/", views.StreamPlatformDetail.as_view(), name='streamplatform-detail'),
    path('review/', views.ReviewList.as_view(),name='review-list'),
    path('review/<int:pk>/', views.ReviewDetail.as_view(),name='review-detail'),


]