
def protecc(request):
    try:
        request.session["enter_page"]
        request.session["attempts"]
    except:
        request.session["enter_page"] = False
        request.session["attempts"] = 0

    if request.session["attemps"] < 5:
        if request.method == 'POST':
            code = request.POST.get("code", "")
            if code == "577677":
                request.session["enter_page"] = True
            else:
                request.session["attempts"] += 1
    
    return {}