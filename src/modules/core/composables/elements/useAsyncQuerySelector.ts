/**
 * Retrieves DOM elements that match the given selector within a specified target element or the entire document.
 *
 * @param {string} selector The CSS selector to match the desired elements.
 * @param {(Element | Document)} [target = window.document] The target element or document to search within.
 *
 * @returns {(Element | Element[])} The matching element(s) found.
 * If only one element matches, it is returned as a single element; otherwise, an array of elements is returned.
 */
const queryElements = (
  selector: string,
  target: Element | Document = window.document
): Element | Element[] => {
  const elements: Element[] = []

  target.querySelectorAll(selector).forEach((element) => {
    elements.push(element)
  })

  if (elements.length === 1) {
    return elements[0]
  }

  return elements
}

/**
 * Retrieves DOM elements asynchronously that match the given selector within a specified target element or the entire document.
 *
 * @param {string} selector The CSS selector to match the desired elements.
 * @param {(Element | Document)} [target = window.document] The target element or document to search within.
 * @param {MutationObserverInit} [options = {}] The options to configure the mutation observer.
 *
 * @returns {Promise<(Element | Element[])>} A promise that resolves to the matching element(s) found.
 * If only one element matches, it resolves to a single element; otherwise, it resolves to an array of elements.
 *
 * @throws {Error} If no matching elements are found within the target element/document.
 */
export const useAsyncQuerySelector = (
  selector: string,
  target: Element | Document = window.document,
  options: MutationObserverInit = {}
): Promise<Element | Element[]> => {
  const { childList = true, subtree = true } = options

  return new Promise((resolve, reject) => {
    const elements = queryElements(selector, target)

    if (!Array.isArray(elements) && elements) {
      return resolve(elements)
    }

    if (Array.isArray(elements) && elements.length) {
      return resolve(elements)
    }

    const mutationObserver = new MutationObserver((records, observer) => {
      const elements = queryElements(selector, target)

      if (!Array.isArray(elements) && elements) {
        return resolve(elements)
      }

      if (Array.isArray(elements) && elements.length) {
        observer.disconnect()

        return resolve(elements)
      }

      return reject()
    })

    const mutationObserverTarget = 'documentElement' in target ? target.documentElement : target

    mutationObserver.observe(mutationObserverTarget, {
      childList,
      subtree,
      ...options
    })
  })
}
