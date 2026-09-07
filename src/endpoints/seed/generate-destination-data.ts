import fs from 'fs'
import path from 'path'
import {
  createHeading,
  createParagraph,
  createList,
  createLinkNode,
  createTextNode,
  extractTextFromLexical,
  countWords,
} from './lexical-builder.js'

export interface DestinationSeedInput {
  title: string
  slug: string
  subTitle: string
  region: string
  summary: string
  distanceFromNairobiKm: number
  estimatedTravelTime: string
  roadCondition: string
  bestTimeToVisit: string
  kwsUrl?: string
  highlights: { highlight: string }[]
  routeInfo: {
    startingPoint: string
    recommendedStops: string
    entryFeesNotes: string
  }
  recommendedFleetSlugs: string[]
  meta: {
    title: string
    description: string
  }
  sections: {
    heading?: string
    paragraphs: (string | any[])[]
    list?: {
      type: 'bullet' | 'number'
      items: (string | any[])[]
    }
  }[]
}

export function buildLexicalContent(sections: DestinationSeedInput['sections']) {
  const children: any[] = []

  for (const sec of sections) {
    if (sec.heading) {
      children.push(createHeading('h2', sec.heading))
    }

    for (const p of sec.paragraphs) {
      if (typeof p === 'string') {
        children.push(createParagraph([createTextNode(p, 0)]))
      } else if (Array.isArray(p)) {
        children.push(createParagraph(p))
      }
    }

    if (sec.list) {
      children.push(createList(sec.list.items, sec.list.type))
    }
  }

  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children,
    },
  }
}
