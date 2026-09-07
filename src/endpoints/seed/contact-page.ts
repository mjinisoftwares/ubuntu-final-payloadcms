import type { RequiredDataFromCollectionSlug } from 'payload'

type ContactArgs = {
  contactFormId: number | string
}

export const contactPage = ({
  contactFormId,
}: ContactArgs): RequiredDataFromCollectionSlug<'pages'> => {
  return {
    title: 'Contact Us',
    slug: 'contact',
    _status: 'published',
    hero: {
      type: 'lowImpact',
      richText: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Contact Ubuntu Logistics',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              tag: 'h1',
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'East Africa’s premier transport, luxury safari, and car hire partner. We operate 24/7 from Nairobi, Kenya. Reach out for custom itinerary planning, airport pick-up scheduling, fleet hire, or urgent transport inquiries.',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
    },
    layout: [
      {
        blockType: 'formBlock',
        enableIntro: true,
        // @ts-expect-error - relationship ID or populated form
        form: contactFormId,
        introContent: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Send Us a Message or Booking Request',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h2',
                version: 1,
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Please provide your travel or service requirements below. Our reservations desk responds within 30 minutes. For immediate dispatch or same-day airport transfers, call our 24/7 hotline at +254 728 798 580.',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
    ],
    meta: {
      title: 'Contact Us | Ubuntu Logistics Kenya',
      description:
        'Contact Ubuntu Logistics in Nairobi, Kenya. Call +254 728 798 580 or email info@ubuntulogistics.co.ke for 24/7 safari transport, airport transfers, and car hire.',
    },
  }
}
