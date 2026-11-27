const KEYWORDS = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break',
  'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally',
  'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal',
  'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
  'match', 'case'
])

const BUILTINS = new Set([
  'print', 'len', 'range', 'list', 'dict', 'set', 'tuple', 'int', 'float',
  'str', 'bool', 'sum', 'min', 'max', 'abs', 'enumerate', 'zip', 'open',
  'super', 'isinstance', 'type', 'map', 'filter', 'sorted', 'round', 'input',
  'format', 'next', 'iter', 'any', 'all', 'getattr', 'setattr', 'Exception',
  'ValueError', 'RuntimeError', 'KeyError'
])

const TOKEN_RE =
  /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(@[A-Za-z_][\w.]*)|\b(\d+\.\d+|\d+)\b|\b([A-Za-z_]\w*)\b/g

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function highlightPython(code = '') {
  let html = ''
  let last = 0
  let match

  TOKEN_RE.lastIndex = 0
  while ((match = TOKEN_RE.exec(code)) !== null) {
    if (match.index > last) {
      html += escapeHtml(code.slice(last, match.index))
    }
    const [raw, comment, str, decorator, number, ident] = match

    if (comment) {
      html += `<span class="tok-comment">${escapeHtml(comment)}</span>`
    } else if (str) {
      html += `<span class="tok-string">${escapeHtml(str)}</span>`
    } else if (decorator) {
      html += `<span class="tok-decorator">${escapeHtml(decorator)}</span>`
    } else if (number) {
      html += `<span class="tok-number">${number}</span>`
    } else if (ident) {
      const rest = code.slice(match.index + raw.length)
      if (KEYWORDS.has(ident)) {
        html += `<span class="tok-keyword">${ident}</span>`
      } else if (BUILTINS.has(ident)) {
        html += `<span class="tok-builtin">${ident}</span>`
      } else if (/^[A-Z]/.test(ident)) {
        html += `<span class="tok-class">${ident}</span>`
      } else if (rest.startsWith('(')) {
        html += `<span class="tok-func">${ident}</span>`
      } else {
        html += ident
      }
    }
    last = match.index + raw.length
  }

  if (last < code.length) html += escapeHtml(code.slice(last))
  return html
}
