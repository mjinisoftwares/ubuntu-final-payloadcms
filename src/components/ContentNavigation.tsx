'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { ChevronDown, ListOrdered, ArrowUp } from 'lucide-react'

export interface HeadingItem {
  id: string
  text: string
  level: number
}

export interface TreeHeading extends HeadingItem {
  children: HeadingItem[]
}

interface ContentNavigationProps {
  title?: string
  className?: string
  selector?: string
  showProgress?: boolean
  showBackToTop?: boolean
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const ContentNavigation: React.FC<ContentNavigationProps> = ({
  title = 'On this page',
  className = '',
  selector,
  showProgress = true,
  showBackToTop = true,
}) => {
  const [headingTree, setHeadingTree] = useState<TreeHeading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)
  const navContainerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const scanHeadings = useCallback(() => {
    if (typeof document === 'undefined') return []

    const defaultSelectors = [
      'article h2',
      'article h3',
      'article h4',
      'main h2',
      'main h3',
      'main h4',
      '[data-content-nav] h2',
      '[data-content-nav] h3',
      '[data-content-nav] h4',
      'h2',
      'h3',
    ].join(', ')

    const targetSelector = selector || defaultSelectors
    const rawElements = Array.from(document.querySelectorAll(targetSelector)) as HTMLElement[]

    // Deduplicate and filter out unwanted elements
    const uniqueElements = Array.from(new Set(rawElements))
    const headingElements = uniqueElements.filter((el) => {
      if (
        el.closest('nav') ||
        el.closest('header') ||
        el.closest('footer') ||
        el.closest('[data-content-nav-ignore]') ||
        el.closest('[aria-hidden="true"]')
      ) {
        return false
      }
      const text = el.innerText?.trim() || el.textContent?.trim()
      return Boolean(text && text.length > 0)
    })

    const usedIds = new Set<string>()
    const flatItems: HeadingItem[] = headingElements.map((el) => {
      const level = Number(el.tagName.substring(1)) || 2
      let id = el.id

      if (!id) {
        const text = el.innerText?.trim() || el.textContent?.trim() || 'section'
        const baseId = slugify(text) || `section-${level}`
        id = baseId
        let counter = 1
        while (usedIds.has(id) || (document.getElementById(id) && document.getElementById(id) !== el)) {
          id = `${baseId}-${counter++}`
        }
        el.id = id
      }
      usedIds.add(id)

      // Add scroll margin so sticky header doesn't overlap the heading
      if (!el.classList.contains('scroll-mt-28')) {
        el.classList.add('scroll-mt-28')
      }

      return {
        id,
        text: el.innerText?.trim() || el.textContent?.trim() || 'Section',
        level,
      }
    })

    // Build hierarchical tree
    const tree: TreeHeading[] = []
    let currentH2: TreeHeading | null = null

    flatItems.forEach((item) => {
      if (item.level === 2) {
        currentH2 = { ...item, children: [] }
        tree.push(currentH2)
      } else if (item.level === 3 || item.level === 4) {
        if (currentH2) {
          currentH2.children.push(item)
        } else {
          const orphanParent: TreeHeading = { ...item, children: [] }
          tree.push(orphanParent)
          currentH2 = orphanParent
        }
      }
    })

    setHeadingTree(tree)

    // Ensure all sections are expanded by default
    const initialOpen: Record<string, boolean> = {}
    tree.forEach((node) => {
      initialOpen[node.id] = true
    })
    setOpenSections((prev) => ({ ...initialOpen, ...prev }))

    // Reconnect IntersectionObserver to the newly detected headings
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    if (headingElements.length > 0) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

          if (visible.length > 0) {
            const newActiveId = visible[0].target.id
            setActiveId(newActiveId)

            setHeadingTree((currentTree) => {
              const parentH2 = currentTree.find(
                (p) => p.id === newActiveId || p.children.some((c) => c.id === newActiveId),
              )
              if (parentH2) {
                setOpenSections((prev) => ({ ...prev, [parentH2.id]: true }))
              }
              return currentTree
            })
          }
        },
        {
          rootMargin: '-80px 0px -60% 0px',
          threshold: 0,
        },
      )

      headingElements.forEach((heading) => observerRef.current?.observe(heading))
    }

    return headingElements
  }, [selector])

  useEffect(() => {
    // Initial scan
    scanHeadings()

    // Retries to catch async hydrated components
    const timer1 = setTimeout(scanHeadings, 100)
    const timer2 = setTimeout(scanHeadings, 300)
    const timer3 = setTimeout(scanHeadings, 800)

    // Scroll progress handler
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    // MutationObserver to capture dynamically mounted blocks
    const mutationObserver = new MutationObserver(() => {
      scanHeadings()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      if (observerRef.current) observerRef.current.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scanHeadings])

  const toggleSection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleLinkClick = (id: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return

    const offset = 100
    const top = target.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({ top, behavior: 'smooth' })
    window.history.replaceState(null, '', `#${id}`)
    setActiveId(id)
    setIsMobileOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalItemsCount = headingTree.reduce((acc, curr) => acc + 1 + curr.children.length, 0)

  // If no dynamic headings found yet, do not return null; render container with graceful state if needed or hide
  if (!headingTree.length) return null

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile Accordion Toggle (shown only on small screens) */}
      <div className="block md:hidden mb-4">
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="w-full flex items-center justify-between p-3.5 rounded-xl border border-border bg-card text-foreground shadow-sm hover:bg-muted/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ListOrdered className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">{title}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              {totalItemsCount}
            </span>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
              isMobileOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Main Table of Contents Card (Always visible on md+, collapsible on mobile) */}
      <nav
        ref={navContainerRef}
        aria-label="Table of contents"
        className={`${
          isMobileOpen ? 'block' : 'hidden md:block'
        } rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm transition-all duration-200 overflow-hidden`}
      >
        {/* Progress Bar */}
        {showProgress && (
          <div className="h-1 w-full bg-muted/60 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}

        {/* Card Header */}
        <div className="p-4 sm:p-5 border-b border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
              <ListOrdered className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground tracking-tight leading-none">
                {title}
              </p>
              <span className="text-[11px] text-muted-foreground font-medium mt-0.5 block">
                {totalItemsCount} section{totalItemsCount !== 1 ? 's' : ''} available
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Headings List */}
        <div className="p-3 sm:p-4 max-h-[calc(100vh-280px)] overflow-y-auto overscroll-contain">
          <ul className="space-y-1 list-none m-0 p-0 text-sm">
            {headingTree.map((parent) => {
              const isParentActive = activeId === parent.id
              const isChildActive = parent.children.some((child) => child.id === activeId)
              const isExpanded = !!openSections[parent.id]
              const hasChildren = parent.children.length > 0

              return (
                <li key={parent.id} className="m-0 group">
                  {/* Parent H2 Header Row */}
                  <div
                    className={`flex items-center justify-between rounded-xl transition-all duration-150 ${
                      isParentActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : isChildActive
                          ? 'bg-muted/60 text-foreground font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                    }`}
                  >
                    <a
                      href={`#${parent.id}`}
                      onClick={(e) => handleLinkClick(parent.id, e)}
                      className="flex-1 flex items-center gap-2 py-2 px-3 text-xs sm:text-[13px] leading-snug outline-none"
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full shrink-0 transition-all duration-200 ${
                          isParentActive
                            ? 'bg-primary scale-125 ring-2 ring-primary/30'
                            : isChildActive
                              ? 'bg-primary/70'
                              : 'bg-muted-foreground/30 group-hover:bg-muted-foreground/60'
                        }`}
                      />
                      <span className="line-clamp-2">{parent.text}</span>
                    </a>

                    {/* Collapsible toggle for subheadings */}
                    {hasChildren && (
                      <button
                        type="button"
                        onClick={(e) => toggleSection(parent.id, e)}
                        aria-label="Toggle section"
                        className="p-2 mr-1 text-muted-foreground hover:text-foreground rounded-lg focus:outline-none transition-colors"
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ease-in-out ${
                            isExpanded ? 'rotate-180 text-foreground' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Subheadings Collapsible Container (H3 / H4) */}
                  {hasChildren && (
                    <div
                      className={`grid transition-all duration-200 ease-in-out overflow-hidden ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden border-l-2 border-border/80 ml-4 pl-2 space-y-0.5 my-0.5">
                        {parent.children.map((child) => {
                          const isSubActive = activeId === child.id

                          return (
                            <a
                              key={child.id}
                              href={`#${child.id}`}
                              onClick={(e) => handleLinkClick(child.id, e)}
                              className={`block text-[12px] py-1.5 px-2.5 transition-all duration-150 rounded-lg leading-snug ${
                                child.level === 4 ? 'pl-4 text-[11px]' : ''
                              } ${
                                isSubActive
                                  ? 'bg-primary/10 text-primary font-semibold'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                              }`}
                            >
                              <span className="line-clamp-2">{child.text}</span>
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        {/* Footer Actions */}
        {showBackToTop && (
          <div className="p-3 border-t border-border/60 bg-muted/20 flex items-center justify-between">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary font-medium transition-colors py-1 px-2 rounded-md hover:bg-muted/50"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Back to top</span>
            </button>
            <span className="text-[11px] text-muted-foreground/70 font-mono">
              {Math.round(scrollProgress)}% read
            </span>
          </div>
        )}
      </nav>
    </div>
  )
}

export default ContentNavigation
