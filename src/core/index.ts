import { Snapshot, Asks, Bids, Delta } from './types'

const fillTotals = (sizes: number[]) => {
  if (!sizes || sizes.length === 0) return []
  const totals: number[] = [sizes[0]]
  sizes.reduce((acc, currentSize) => {
    const nextSize = acc + currentSize
    totals.push(nextSize)
    return nextSize
  })
  return totals
}

// Asks ([price, size]) are ordered from bigger to smaller price
const sortAsks = (orders: number[][]) =>
  orders.sort((order1: number[], order2: number[]) => order2[0] - order1[0])

// Bids ([price, size]) are ordered from smaller to bigger price
const sortBids = (orders: number[][]) =>
  orders.sort((order1: number[], order2: number[]) => order1[0] - order2[0])

// If found, remove a level from a list of orders *in place*
const removeOrder = (orders: number[][], level: number) => {
  const index = orders.findIndex((order) => order[0] === level)
  if (index !== -1) orders.splice(index, 1)
  return orders
}

// If found, update a level from a list of orders *in place*
// Otherwise, add it
// TODO: This is not optimal!!!
const addOrUpdateOrder = (orders: number[][], level: number[]) => {
  // If it's greater than the first order, add it at the beginning
  if (level[0] > orders[0][0]) return orders.unshift(level)
  // If it's smaller than the last one, add it at the end
  if (level[0] < orders[orders.length - 1][0]) return orders.push(level)
  // If found, update the level
  let found = false
  orders.forEach((order, index) => {
    if (order[0] === level[0]) {
      found = true
      orders[index][1] = level[1]
    }
  })
  //...otherwise, push it and sort
  if (!found) {
    orders.push(level)
    sortAsks(orders)
  }
  return orders
}

// Merge a delta message in an "asks" order list.
// Input order list is ordered, delta list is also ordered
// so there is no need to order again the resulting list
const mergeAsks = (asks: Asks, deltaMsg: Delta) => {
  const deltaAsks = deltaMsg.asks
  if (deltaAsks.length === 0) return asks
  const newAsks = [...asks]
  deltaAsks.forEach((deltaAsk) => {
    if (deltaAsk[1] === 0) {
      removeOrder(newAsks, deltaAsk[0])
    } else {
      addOrUpdateOrder(newAsks, deltaAsk)
    }
  })
  return newAsks
}

export { fillTotals, mergeAsks, removeOrder, addOrUpdateOrder, sortAsks }
