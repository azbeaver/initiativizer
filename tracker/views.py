from django.shortcuts import render
# from django.http import HttpResponse

# Create your views here.
def tracker(request):
	return render(request, "tracker/tracker.html")
