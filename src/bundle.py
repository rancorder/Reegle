"""Bundle the templates with inlined CSS, JS, data, and base64 images."""
import base64, json, os

ROOT = '/home/claude/reegle_present'

def inline_image(path):
    with open(path, 'rb') as f:
        b64 = base64.b64encode(f.read()).decode()
    return f'data:image/webp;base64,{b64}'

# Load assets
css = open(f'{ROOT}/slides.css').read()
renderer = open(f'{ROOT}/renderer.js').read()
slides_data = json.load(open('/home/claude/slides_data.json'))
scripts_data = json.load(open('/home/claude/scripts.json'))

images = {
    'unit_pair': inline_image(f'{ROOT}/unit_pair.webp'),
    'usage_scene': inline_image(f'{ROOT}/usage_scene.webp'),
    'parts': inline_image(f'{ROOT}/parts.webp'),
}

def bundle(template_path, output_path, include_scripts):
    tmpl = open(template_path).read()
    out = tmpl
    out = out.replace('__INLINE_CSS__', css)
    out = out.replace('__INLINE_RENDERER__', renderer)
    out = out.replace('__INLINE_IMAGES__', json.dumps(images, ensure_ascii=False))
    out = out.replace('__INLINE_SLIDES__', json.dumps(slides_data, ensure_ascii=False))
    if include_scripts:
        out = out.replace('__INLINE_SCRIPTS__', json.dumps(scripts_data, ensure_ascii=False))
    open(output_path, 'w').write(out)
    print(f'  {output_path}: {os.path.getsize(output_path)//1024}KB')

print('Bundling...')
bundle(f'{ROOT}/index.template.html', f'{ROOT}/index.html', include_scripts=False)
bundle(f'{ROOT}/present.template.html', f'{ROOT}/present.html', include_scripts=True)
print('Done.')
