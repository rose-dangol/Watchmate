from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination, CursorPagination


class ReviewPageNumberPagination(PageNumberPagination):
    page_size = 1
    page_query_param = 'pageno'#  "next": "http://127.0.0.1:8000/watch/review/?page=2" 'page' lai change garxa
    page_size_query_param = 'page_size'
    max_page_size = 2
    last_page_strings = ('end','last')

class ReviewLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 2    #limit - kati ota?
    #offset - ka bata?  offset=1 vaneko after 1 arko data dekhau
    limit_query_param = 'size'
    offset_query_param = 'start'
    max_limit = 2

class ReviewCursorPagination(CursorPagination):
    page_size = 1
    ordering ='-created_at'
    cursor_query_param = 'record'