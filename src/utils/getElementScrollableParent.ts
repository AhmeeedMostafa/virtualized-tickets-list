type MyType = (element: Element | null) => Element | Window;

const getElementScrollableParent: MyType = (element: Element | null) => {
  if (
    !element ||
    element.nodeName === "#document" ||
    element.nodeName === "HTML"
  ) {
    return (
      (document.scrollingElement?.nodeName !== "HTML" &&
        document.scrollingElement) ||
      window
    );
  }

  const { overflowY } = window.getComputedStyle(element);
  const noScrollValues = ["visible", "hidden", "initial"];
  const isScrollable = !noScrollValues.includes(overflowY?.toLowerCase());

  if (isScrollable && element.scrollHeight > element.clientHeight) {
    return element;
  }

  return getElementScrollableParent(element.parentElement);
};

export default getElementScrollableParent;
