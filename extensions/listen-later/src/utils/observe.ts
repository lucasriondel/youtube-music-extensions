export default function observe(
  element: HTMLElement,
  options: MutationObserverInit,
  mutationHandler: (mutation: MutationRecord) => void
) {
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutationHandler);
  });

  mutationObserver.observe(element, options);

  return mutationObserver;
}
