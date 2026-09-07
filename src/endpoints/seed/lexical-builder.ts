import fs from 'fs'
import path from 'path'

// Helper to count words across Lexical AST or text
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function createTextNode(text: string, format: number = 0) {
  return {
    detail: 0,
    format,
    mode: 'normal',
    style: '',
    text,
    type: 'text',
    version: 1,
  }
}

export function createLinkNode(url: string, text: string, newTab: boolean = true) {
  return {
    type: 'link',
    fields: {
      linkType: 'custom',
      url,
      newTab,
    },
    format: '',
    indent: 0,
    version: 2,
    direction: 'ltr',
    children: [createTextNode(text, 0)],
  }
}

export function createParagraph(children: any[]) {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children,
  }
}

export function createHeading(tag: 'h2' | 'h3' | 'h4', text: string) {
  return {
    type: 'heading',
    tag,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [createTextNode(text, 0)],
  }
}

export function createList(items: (string | any[])[], listType: 'bullet' | 'number' = 'bullet') {
  return {
    type: 'list',
    listType,
    start: 1,
    tag: listType === 'bullet' ? 'ul' : 'ol',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: items.map((item, idx) => ({
      type: 'listitem',
      value: idx + 1,
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: Array.isArray(item) ? item : [createTextNode(item, 0)],
    })),
  }
}

export function extractTextFromLexical(node: any): string {
  if (!node) return ''
  if (node.text) return node.text + ' '
  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractTextFromLexical).join('')
  }
  return ''
}
