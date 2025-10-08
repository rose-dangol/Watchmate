from django.urls import path
from watchlist_app.api.v1 import views
from watchlist_app.api.v1.views import ReviewListViewSet, StreamPlatformModelViewSet
from rest_framework import routers

review_list = ReviewListViewSet.as_view({'get':"list"})
review_detail = ReviewListViewSet.as_view({'get':"retrieve"})

router = routers.DefaultRouter()
router.register('review', ReviewListViewSet, basename='review')
router.register('stream', StreamPlatformModelViewSet, basename='stream')


# from watchmate.urls import urlpatterns

urlpatterns = [
    path("list/", views.MovieList.as_view(), name='watch-list'),
    path("<int:pk>/", views.MovieDetail.as_view(), name='movie-detail'),

    # path('stream/', views.StreamPlatforms.as_view(),name='platform-list'),
    # path("stream/<int:pk>/", views.StreamPlatformDetail.as_view(),name='streamplatform-detail'),

    # path('review/', views.ReviewList.as_view(),name='review-list'),
    # path('review/<int:pk>/', views.ReviewDetail.as_view(),name='review-detail'),

    # path('review/', review_list,name='review-list'),
    # path('review/<int:pk>/', review_detail,name='review-detail'),
]+ router.urls