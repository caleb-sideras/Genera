
def protecc(request):
    try:
        request.session["enter_page"]
    except:
        request.session["enter_page"] = False

    if request.method == 'POST':
        code = request.POST.get("code", "")
        if code == "577677":
            request.session["enter_page"] = True
    return {}