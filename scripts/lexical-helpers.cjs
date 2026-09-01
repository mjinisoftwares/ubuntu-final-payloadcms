const fs = require('fs');
const path = require('path');

// Helper functions for Lexical Nodes
function text(t, format = 0) {
  return { detail: 0, format, mode: 'normal', style: '', text: t, type: 'text', version: 1 };
}
function bold(t) {
  return text(t, 1);
}
function link(url, t) {
  return {
    type: 'link',
    fields: { linkType: 'custom', url, newTab: false },
    format: '',
    indent: 0,
    version: 2,
    direction: 'ltr',
    children: [text(t)]
  };
}
function p(children) {
  return {
    type: 'paragraph',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: Array.isArray(children) ? children : [text(children)]
  };
}
function h2(title) {
  return {
    type: 'heading',
    tag: 'h2',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [text(title)]
  };
}
function h3(title) {
  return {
    type: 'heading',
    tag: 'h3',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [text(title)]
  };
}
function ul(items) {
  return {
    type: 'list',
    listType: 'bullet',
    start: 1,
    tag: 'ul',
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
      children: Array.isArray(item) ? item : [text(item)]
    }))
  };
}

function countWords(node) {
  let count = 0;
  if (node.text) {
    count += node.text.trim().split(/\s+/).filter(Boolean).length;
  }
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      count += countWords(child);
    }
  }
  return count;
}

module.exports = {
  text,
  bold,
  link,
  p,
  h2,
  h3,
  ul,
  countWords
};
