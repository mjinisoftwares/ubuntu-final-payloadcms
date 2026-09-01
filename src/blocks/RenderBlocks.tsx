import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { AboutBlock } from '@/blocks/AboutBlock/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CarouselBlock } from '@/blocks/CarouselBlock/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FAQsBlockComponent } from '@/blocks/FAQBlock/Component'
import { FeatureCardsComponent } from '@/blocks/FeatureCards/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { PricingBlockComponent } from '@/blocks/PricingBlock/Component'
import { ReviewsBlockComponent } from '@/blocks/ReviewsBlock/Component'
import { ServiceArchiveBlockComponent } from '@/blocks/ServiceArchiveBlock/Component'
import { SmallFeatureCardsComponent } from '@/blocks/SmallFeatureCards/Component'
import { TeamBlockComponent } from '@/blocks/TeamBlock/Component'
import { TitleBlockComponent } from '@/blocks/TitleBlock/Component'
import { UsefulLinksBlockComponent } from '@/blocks/UsefulLinksBlock/Component'
import { DestinationArchiveBlockComponent } from '@/blocks/DestinationArchiveBlock/Component'
import { PricingArchiveBlockComponent } from '@/blocks/PricingArchiveBlock/Component'
import { FleetArchiveBlockComponent } from '@/blocks/FleetArchiveBlock/Component'

const blockComponents: Record<string, React.ComponentType<any>> = {
  about: AboutBlock,
  archive: ArchiveBlock,
  banner: BannerBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  carousel: CarouselBlock,
  carouselBlock: CarouselBlock,
  faqsBlock: FAQsBlockComponent,
  featureCards: FeatureCardsComponent,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  pricingBlock: PricingBlockComponent,
  reviewsBlock: ReviewsBlockComponent,
  serviceArchive: ServiceArchiveBlockComponent,
  smallFeatureCards: SmallFeatureCardsComponent,
  teamBlock: TeamBlockComponent,
  titleBlock: TitleBlockComponent,
  usefulLinksBlock: UsefulLinksBlockComponent,
  destinationArchive: DestinationArchiveBlockComponent,
  pricingArchive: PricingArchiveBlockComponent,
  fleetArchive: FleetArchiveBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: any[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="" key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
