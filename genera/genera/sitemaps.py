from django.contrib.sitemaps import Sitemap
from django.shortcuts import reverse
class StaticViewSitemap(Sitemap):
    def items(self):
        return ['main:main_view', 'main:about', 'main:documentation', 'main:privacy', 'main:terms', 'main:robots', 'main:problem_report', 'main:reported_issues', 'main:mint', 'main:login_options', 'main:login', 'main:logout', 'main:register', 'main:password_reset']
    def location(self, item):
        return reverse(item)