from django.urls import path
from django.urls import include
from django.conf.urls import url
from TaskRestAPI.views import Kategorija_look,knjiga_look
urlpatterns = [
    path(r'',Kategorija_look.as_view(),name="fantastika"),
    url(r'^(?P<ISBN>.*)$',knjiga_look,name="fantastika_id"),
]