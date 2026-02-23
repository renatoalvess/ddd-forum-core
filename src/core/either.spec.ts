import { expect, test } from 'vitest'
import { left, Left, Right, right, type Either } from './either'

function doSomething(shouldSucceed: boolean): Either<string, number> {
  if (shouldSucceed) {
    return right(10)
  } else {
    return left('Error')
  }
}

test('success result', () => {
  const result = doSomething(true)

  expect(result.isRight()).toBe(true)
  expect(result.isLeft()).toBe(false)
})

test('error result', () => {
  const result = doSomething(false)

  expect(result.isLeft()).toBe(true)
  expect(result.isRight()).toBe(false)
})
