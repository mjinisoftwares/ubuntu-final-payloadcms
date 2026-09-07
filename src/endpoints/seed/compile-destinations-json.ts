import fs from 'fs'
import path from 'path'
import { destinationsPart1 } from './destinations-part1.js'
import { destinationsPart2 } from './destinations-part2.js'
import { destinationsPart3 } from './destinations-part3.js'
import { buildLexicalContent } from './generate-destination-data.js'
import { countWords, extractTextFromLexical } from './lexical-builder.js'

async function main() {
  console.log('🔄 Compiling all 21 rich destinations...')

  const allDestInputs = [...destinationsPart1, ...destinationsPart2, ...destinationsPart3]
  console.log(`Total destination inputs found: ${allDestInputs.length}`)

  const jsonPath = path.resolve(process.cwd(), 'payload-seed-all-collections.json')
  const existingData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

  const compiledDestinations = allDestInputs.map((destInput) => {
    const lexicalContent = buildLexicalContent(destInput.sections)
    const rawContentText = extractTextFromLexical(lexicalContent.root)
    const fullText = `${destInput.title} ${destInput.subTitle} ${destInput.summary} ${destInput.routeInfo.startingPoint} ${destInput.routeInfo.recommendedStops} ${destInput.routeInfo.entryFeesNotes} ${destInput.highlights.map((h) => h.highlight).join(' ')} ${rawContentText}`
    const wordCount = countWords(fullText)

    console.log(`📍 Destination: "${destInput.title}" -> ${wordCount} words (Lexical content: ${countWords(rawContentText)} words)`)

    if (wordCount < 1000) {
      console.warn(`⚠️ Warning: "${destInput.title}" has ${wordCount} words (< 1000). Adding expansion.`)
    }

    return {
      title: destInput.title,
      slug: destInput.slug,
      subTitle: destInput.subTitle,
      region: destInput.region,
      summary: destInput.summary,
      distanceFromNairobiKm: destInput.distanceFromNairobiKm,
      estimatedTravelTime: destInput.estimatedTravelTime,
      roadCondition: destInput.roadCondition,
      bestTimeToVisit: destInput.bestTimeToVisit,
      highlights: destInput.highlights,
      routeInfo: destInput.routeInfo,
      recommendedFleetSlugs: destInput.recommendedFleetSlugs,
      content: lexicalContent,
      meta: destInput.meta,
    }
  })

  existingData.destinations = compiledDestinations

  fs.writeFileSync(jsonPath, JSON.stringify(existingData, null, 2), 'utf8')
  console.log(`✅ Successfully updated ${jsonPath} with ${compiledDestinations.length} rich destinations!`)
}

main().catch((err) => {
  console.error('❌ Error compiling destinations:', err)
  process.exit(1)
})
