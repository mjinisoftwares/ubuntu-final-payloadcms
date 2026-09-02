import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  let url =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://ubuntulogistics.co.ke'

  if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`
  }

  return url.replace(/\/$/, '')
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, '')}`
  }

  let url = process.env.NEXT_PUBLIC_SERVER_URL || ''
  if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`
  }

  return url.replace(/\/$/, '')
}
