import html
import bibtexparser

def clean_val(val: str) -> str:
    return val.strip("{} \n\r") if val else ""

def format_authors(author_str: str) -> str:
    if not author_str:
        return "Unknown Authors"
    authors = [a.strip() for a in author_str.replace("\n", " ").split(" and ")]
    formatted = []
    for a in authors:
        parts = [p.strip() for p in a.split(",")]
        formatted.append(f"{parts[1]} {parts[0]}" if len(parts) > 1 else parts[0])
    return html.escape(", ".join(formatted))

# 1. Parse the single bib file
library = bibtexparser.parse_file("./joymahapatra.bib")

# 2. Sort by year descending (newest first)
def get_year(entry):
    try:
        return int(clean_val(entry.fields_dict.get("year", None).value))
    except (ValueError, AttributeError):
        return 0

sorted_entries = sorted(library.entries, key=get_year, reverse=True)

# 3. Build the <li> string
list_items = []
for entry in sorted_entries:
    f = {k.lower(): v.value for k, v in entry.fields_dict.items()}

    title = html.escape(clean_val(f.get("title", "Untitled")))
    authors = format_authors(f.get("author", ""))
    venue = html.escape(clean_val(f.get("booktitle") or f.get("journal") or "Preprint"))
    year = clean_val(f.get("year", "n.d."))

    paper_url = clean_val(f.get("url") or f.get("doi") or "#")
    if paper_url.startswith("10."):
        paper_url = f"https://doi.org/{paper_url}"
    code_url = clean_val(f.get("code") or f.get("github") or "#")

    list_items.append(f"""<li>
    <strong>{title}</strong><br>
    <span>{authors}</span><br>
    <span class="meta">{venue}, {year}</span><br>
    <span class="links"><a href="{paper_url}">Paper</a> &middot; <a href="{code_url}">Code</a> &middot; <a href="#{entry.key}">BibTeX</a></span>
</li>""")

list_items_text = "\n".join(list_items)
print(list_items_text)
