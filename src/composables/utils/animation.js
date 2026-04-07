import { gsap } from 'gsap'

/**
 * Add stagger animation to elements.
 *
 * @param {HTMLElement[]} elements
 * @param {Object} options
 * @return {void}
 */
export const addStaggerAnimation = (
  elements,
  { opacity = 0, y = 0, duration = 0.5, delay = 0, stagger = 0.2, ease = 'power2.out' } = {},
) => {
  if (!elements) return

  gsap.from(elements, {
    opacity,
    y,
    duration,
    delay,
    stagger,
    ease,
  })
}
