import jinja2, json
import os
from rich.console import Console

console = Console()

def delete_if_exsist(filename):
	if os.path.exists(filename):
		os.remove(filename)
	else:
		pass

with open(f'audio.json') as f:
	data = json.load(f)

main_audio = data['main_audio']

html = jinja2.Environment(
    loader=jinja2.FileSystemLoader('./')).get_template('template.html').render(main_audio = main_audio)

OUT = "../index.html"  # Compiled Index.HTML file with all the audio information from the JSON datastore
delete_if_exsist(OUT) # Remove if already existing

with open(OUT,'w') as f: 
	f.write(html)