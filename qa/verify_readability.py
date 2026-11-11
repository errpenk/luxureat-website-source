import re
from html.parser import HTMLParser
from pathlib import Path


class Sections(HTMLParser):
    def __init__(self):
        super().__init__()
        self.skip = 0
        self.text = []
        self.counts = []

    def boundary(self):
        self.counts.append(len(re.findall(r"\b[\w’'-]+\b", " ".join(self.text))))
        self.text = []

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "svg"):
            self.skip += 1
        if re.fullmatch(r"h[1-6]", tag):
            self.boundary()

    def handle_endtag(self, tag):
        if tag in ("script", "style", "svg"):
            self.skip = max(0, self.skip - 1)

    def handle_data(self, data):
        if not self.skip:
            self.text.append(data)


for page in ("blog", "product", "import-export-services"):
    html = Path(f".deploy/luxureat-static/pages/en/{page}.php").read_text()
    body = html.split("<!-- lux:header:end -->", 1)[1].split("<!-- lux:footer:start -->", 1)[0]
    sections = Sections()
    sections.feed(body)
    sections.boundary()
    assert max(sections.counts) <= 300, (page, max(sections.counts))
    if page == "import-export-services":
        assert len(re.findall(r"<summary><h3>", body)) == 15
    print(f"{page}: longest section {max(sections.counts)} words")
