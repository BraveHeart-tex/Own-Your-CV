export const isElementCentered = (element: HTMLElement) => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const elementCenter = rect.top + rect.height / 2;
  const viewportCenter = window.innerHeight / 2;

  // Allow a small threshold to avoid unnecessary scrolling
  const threshold = 50;

  return Math.abs(elementCenter - viewportCenter) <= threshold;
};

export const scrollToCenterAndFocus = (element: HTMLElement) => {
  if (!element) return;

  const isCentered = isElementCentered(element);

  if (isCentered) {
    element.focus();
    return;
  }

  element.scrollIntoView({ behavior: 'smooth', block: 'center' });

  setTimeout(() => {
    element.focus();
  }, 300);
};
