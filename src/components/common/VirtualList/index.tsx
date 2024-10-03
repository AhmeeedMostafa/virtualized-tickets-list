import { FunctionComponent, MutableRefObject, useEffect, useRef, useState } from "react"

import style from './VirtualList.module.css'
import getElementScrollableParent from "../../../utils/getElementScrollableParent"

type MyProps<T extends object, K extends keyof T> = {
  keyProp: K,
  items: T[],
  ListItem: FunctionComponent<{ item: T , height: number, index: number }>
  overScan?: number,
  initialIndex?: number,
  itemHeight?: number,
}

const DEFAULT_VISIBLE_ITEMS = 10
const SPACING_ITEM = 1 // number of items to be added in the end of the list as a safe space for scrolling.

function VirtualList <T extends object, K extends keyof T> ({
  keyProp, items, ListItem, overScan = 5, initialIndex = 0, itemHeight = 75,
} : MyProps<T, K>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollableParentRef: MutableRefObject<Element | Window | null> = useRef(null)
  const [scrollTop, setScrollTop] = useState(initialIndex * itemHeight)

  const itemsCount = items.length
  const totalHeight = (itemsCount + SPACING_ITEM) * itemHeight

  const handleOnScroll = (e: Event) => {
    const element = e.currentTarget as Element | Window
    const scrollPosition = (element as Element).scrollTop ?? (element as Window).scrollY
    const scrollPositionRelativeToList = scrollPosition - (rootRef.current?.offsetTop ?? 0)

    setScrollTop(
      Math.min(
        Math.max(0, scrollPositionRelativeToList),
        rootRef.current?.offsetHeight ?? 0
      )
    )
  }

  useEffect(() => {
    let scrollableParent: Element | Window
    if (rootRef.current) {
      scrollableParent = getElementScrollableParent(rootRef.current)
      scrollableParent.addEventListener('scroll', handleOnScroll, { passive: true })
      scrollableParentRef.current = scrollableParent
    }

    return () => {
      if (scrollableParent) {
        scrollableParent.removeEventListener('scroll', handleOnScroll)
      }
    }
  }, [])

  if (!Array.isArray(items) || items.length === 0) {
    return <h3>Sorry, no items found.</h3>
  }

  const visibleHeight = (scrollableParentRef.current as Element)?.clientHeight ||
    (scrollableParentRef.current as Window)?.innerHeight || 0

  const visibleItemsCount = Math.floor(visibleHeight / itemHeight) || DEFAULT_VISIBLE_ITEMS

  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / itemHeight) - overScan
  )
  const endIndex = Math.min(
    itemsCount,
    startIndex + visibleItemsCount + (overScan * 2)
  )

  return (
    <div ref={rootRef} className={style.virtualListRoot}>
      <div
        className={style.virtualList}
        style={{ height: totalHeight, transform: `translateY(${startIndex * itemHeight}px)` }}
      >
        {items.slice(startIndex, endIndex).map((item, i) => (
          <ListItem key={item[keyProp] as string} item={item} height={itemHeight} index={startIndex + i} />))}
      </div>
    </div>
  )
}

export default VirtualList
