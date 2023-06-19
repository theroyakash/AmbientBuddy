import jinja2, json
import os

def delete_if_exsist(filename):
	if os.path.exists(filename):
		os.remove(filename)
	else:
		pass

with open(f'audio.json') as f:
	data = json.load(f)

html = jinja2.Environment(
    loader=jinja2.FileSystemLoader('./')).get_template('template.html').render(data = data)

OUT = "index.html"  # Compiled Index.HTML file with all the audio information from the JSON datastore
delete_if_exsist(OUT) # Remove if already existing

with open(OUT,'w') as f: 
	f.write(html)