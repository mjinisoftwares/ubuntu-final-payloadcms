const fs = require('fs');
const path = require('path');

// Helper to create Lexical AST Nodes
function textNode(text, format = 0) {
  return { detail: 0, format, mode: 'normal', style: '', text, type: 'text', version: 1 };
}

function boldNode(text) {
  return textNode(text, 1);
}

function linkNode(url, text) {
  return {
    type: 'link',
    fields: { linkType: 'custom', url, newTab: false },
    format: '',
    indent: 0,
    version: 2,
    direction: 'ltr',
    children: [textNode(text)]
  };
}

function paragraphNode(children) {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: Array.isArray(children) ? children : [textNode(children)]
  };
}

function headingNode(text, tag = 'h2') {
  return {
    type: 'heading',
    tag,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [textNode(text)]
  };
}

function listNode(items, listType = 'bullet') {
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
      children: Array.isArray(item) ? item : [textNode(item)]
    }))
  };
}

function countWordsInNode(node) {
  let count = 0;
  if (node.text) {
    count += node.text.trim().split(/\s+/).filter(Boolean).length;
  }
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      count += countWordsInNode(child);
    }
  }
  return count;
}

console.log('Lexical helper module loaded');
