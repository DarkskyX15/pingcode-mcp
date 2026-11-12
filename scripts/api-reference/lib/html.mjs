// Minimal, dependency-free HTML -> Markdown / plain text conversion.
// Input is apiDoc-rendered HTML fragments (descriptions, tables, <pre> blocks).

const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'col']);
const ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

export function decodeEntities(text) {
  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, body) => {
    if (body[0] === '#') {
      const hex = body[1] === 'x' || body[1] === 'X';
      const code = Number.parseInt(hex ? body.slice(2) : body.slice(1), hex ? 16 : 10);
      if (Number.isFinite(code)) {
        try {
          return String.fromCodePoint(code);
        } catch {
          return match;
        }
      }
      return match;
    }
    return ENTITIES[body.toLowerCase()] ?? match;
  });
}

function parseAttributes(source) {
  const attrs = {};
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;
  let match;
  while ((match = re.exec(source))) {
    attrs[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return attrs;
}

export function parseHtml(html) {
  const root = { tag: '#root', attrs: {}, children: [] };
  const stack = [root];
  let i = 0;

  const pushText = (text) => {
    if (!text) return;
    stack[stack.length - 1].children.push({ tag: '#text', text });
  };

  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt === -1) {
      pushText(html.slice(i));
      break;
    }
    if (lt > i) pushText(html.slice(i, lt));

    if (html.startsWith('<!--', lt)) {
      const end = html.indexOf('-->', lt + 4);
      i = end === -1 ? html.length : end + 3;
      continue;
    }

    const gt = html.indexOf('>', lt + 1);
    if (gt === -1) {
      pushText(html.slice(lt));
      break;
    }

    const inner = html.slice(lt + 1, gt).trim();
    if (!inner || inner[0] === '!') {
      i = gt + 1;
      continue;
    }

    if (inner[0] === '/') {
      const name = inner.slice(1).trim().toLowerCase().split(/\s+/)[0];
      for (let depth = stack.length - 1; depth > 0; depth -= 1) {
        if (stack[depth].tag === name) {
          stack.length = depth;
          break;
        }
      }
      i = gt + 1;
      continue;
    }

    const selfClosing = inner.endsWith('/');
    const body = selfClosing ? inner.slice(0, -1) : inner;
    const name = body.split(/\s+/)[0].toLowerCase();
    const node = { tag: name, attrs: parseAttributes(body.slice(name.length)), children: [] };
    stack[stack.length - 1].children.push(node);
    if (!VOID.has(name) && !selfClosing) stack.push(node);
    i = gt + 1;
  }

  return root;
}

function textContent(node) {
  if (node.tag === '#text') return decodeEntities(node.text);
  return (node.children ?? []).map(textContent).join('');
}

function collapseInline(text) {
  return text.replace(/[ \t\r\n]+/g, ' ').replace(/\s+([,.;:!?，。；：！？、])/g, '$1');
}

function renderChildren(node, ctx) {
  return (node.children ?? [])
    .map((child) => (ctx.inline ? renderInlineNode(child) : renderNode(child, ctx)))
    .join('');
}

function renderInlineNode(node) {
  if (node.tag === '#text') {
    const text = decodeEntities(node.text);
    return collapseInline(text.replace(/\n+/g, ' '));
  }
  switch (node.tag) {
    case 'br':
      return '  \n';
    case 'code': {
      const value = textContent(node).trim();
      if (!value) return '';
      const fence = value.includes('`') ? '``' : '`';
      return `${fence}${value}${fence}`;
    }
    case 'strong':
    case 'b':
      return `**${renderChildren(node, { inline: true }).trim()}**`;
    case 'em':
    case 'i':
      return `*${renderChildren(node, { inline: true }).trim()}*`;
    case 'a': {
      const rawHref = node.attrs.href || '';
      const href = rawHref.startsWith('/') ? `https://open.pingcode.com${rawHref}` : rawHref;
      const label = renderChildren(node, { inline: true }).trim();
      if (!label) return '';
      if (!href || href.startsWith('#')) return label;
      return `[${label}](${href})`;
    }
    case 'span':
    case 'small':
    case 'sub':
    case 'sup':
      return renderChildren(node, { inline: true });
    default:
      return renderChildren(node, { inline: true });
  }
}

function renderList(node, ctx) {
  const ordered = node.tag === 'ol';
  const items = (node.children ?? []).filter((child) => child.tag === 'li');
  const start = Number(node.attrs.start || 0);
  const lines = items.map((item, index) => {
    const prefix = ordered ? `${start + index + 1}. ` : '- ';
    const body = renderChildren(item, { ...ctx, inline: false })
      .trim()
      .replace(/\n{2,}/g, '\n');
    const indented = body
      .split('\n')
      .map((line, lineIndex) => (lineIndex === 0 ? line : line ? `  ${line}` : line))
      .join('\n');
    return `${prefix}${indented}`;
  });
  return `${lines.join('\n')}\n\n`;
}

function renderTable(node) {
  const rows = [];
  const walk = (current) => {
    for (const child of current.children ?? []) {
      if (child.tag === 'tr') {
        rows.push(
          (child.children ?? [])
            .filter((cell) => cell.tag === 'th' || cell.tag === 'td')
            .map((cell) =>
              renderChildren(cell, { inline: true })
                .replace(/\n+/g, ' ')
                .replace(/\|/g, '\\|')
                .trim(),
            ),
        );
      } else if (child.tag === 'thead' || child.tag === 'tbody' || child.tag === 'tfoot') {
        walk(child);
      }
    }
  };
  walk(node);
  if (!rows.length) return '';
  const width = Math.max(...rows.map((row) => row.length));
  const pad = (row) => [...row, ...Array(width - row.length).fill('')];
  const header = pad(rows[0]);
  const body = rows.slice(1).map(pad);
  const lines = [
    `| ${header.join(' | ')} |`,
    `| ${header.map(() => '---').join(' | ')} |`,
    ...body.map((row) => `| ${row.join(' | ')} |`),
  ];
  return `${lines.join('\n')}\n\n`;
}

function renderPre(node) {
  const raw = renderChildren(node, { inline: false, pre: true });
  const text = raw
    .replace(/<[^>]*>/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, (match) => (match.startsWith('  ') ? '  \n' : '\n'))
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+|\s+$/g, '');
  if (!text.trim()) return '';
  const language = /language-([a-z0-9-]+)/i.exec(node.attrs.class || '')?.[1] ?? '';
  const fence = text.includes('```') ? '````' : '```';
  return `${fence}${language}\n${text}\n${fence}\n\n`;
}

function renderNode(node, ctx) {
  if (node.tag === '#text') {
    if (ctx.pre) return decodeEntities(node.text);
    const text = decodeEntities(node.text);
    if (!text.trim()) return '';
    return renderInlineNode(node);
  }
  switch (node.tag) {
    case 'p': {
      const body = renderChildren(node, { inline: true }).trim();
      if (!body) return '';
      return `${body}\n\n`;
    }
    case 'br':
      return ctx.pre ? '\n' : '  \n';
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6': {
      const level = Number(node.tag[1]);
      const body = renderChildren(node, { inline: true }).trim();
      return body ? `${'#'.repeat(level)} ${body}\n\n` : '';
    }
    case 'ul':
    case 'ol':
      return renderList(node, ctx);
    case 'table':
      return renderTable(node);
    case 'pre':
      return renderPre(node);
    case 'blockquote': {
      const body = renderChildren(node, ctx)
        .trim()
        .split('\n')
        .map((line) => `> ${line}`)
        .join('\n');
      return `${body}\n\n`;
    }
    case 'hr':
      return '---\n\n';
    case 'div':
    case 'section':
    case 'article':
      return `${renderChildren(node, ctx).trim()}\n\n`;
    case 'img': {
      const alt = node.attrs.alt || '';
      const src = node.attrs.src || '';
      return src ? `![${alt}](${src})\n\n` : '';
    }
    case 'script':
    case 'style':
      return '';
    default:
      return renderChildren(node, ctx);
  }
}

function normalizeMarkdown(markdown) {
  return markdown
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, (match) => (match.startsWith('  ') ? '  \n' : '\n'))
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n+|\n+$/g, '');
}

export function htmlToMarkdown(html) {
  if (!html) return '';
  return normalizeMarkdown(renderNode(parseHtml(html), { inline: false }));
}

export function htmlToText(html) {
  if (!html) return '';
  const text = textContent(parseHtml(html));
  return text.replace(/\s+/g, ' ').trim();
}

export function escapeTableCell(value) {
  return String(value).replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim();
}
