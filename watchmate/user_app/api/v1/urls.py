from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from user_app.api.v1 import views
from rest_framework.authtoken import views
from user_app.api.v1.views import user_register_view, user_logout

# from watchmate.urls import urlpatterns

urlpatterns = [
    path("login/",views.obtain_auth_token, name='login'),
    path("register/",user_register_view,name='register'),
    path("logout/", user_logout, name='logout'),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
