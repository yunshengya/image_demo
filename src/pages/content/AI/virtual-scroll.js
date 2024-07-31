export default {
  mounted(el, binding) {
    const { value } = binding;
    const container = el;
    const items = value.items || [];
    const buffer = value.buffer || 5;
    const itemHeights = new Array(items.length).fill(0);
    let totalHeight = 0;

    container.style.position = 'relative';
    container.style.overflowY = 'auto';
    container.style.height = '100%';
    container.style.boxSizing = 'border-box';

    const viewport = document.createElement('div');
    viewport.style.position = 'absolute';
    viewport.style.top = '0';
    viewport.style.left = '0';
    viewport.style.width = '100%';
    container.appendChild(viewport);

    const renderItems = () => {
      const scrollTop = container.scrollTop;
      const start = findStartIndex(scrollTop) - buffer;
      const end = findEndIndex(scrollTop) + buffer;

      viewport.innerHTML = '';
      let offsetTop = 0;

      for (let i = Math.max(start, 0); i <= Math.min(end, items.length - 1); i++) {
        const item = document.createElement('div');
        item.style.position = 'absolute';
        item.style.top = `${offsetTop}px`;
        item.style.left = '0';
        item.style.width = '100%';
        item.style.height = `${itemHeights[i]}px`;
        item.textContent = items[i];
        viewport.appendChild(item);
        offsetTop += itemHeights[i];
      }

      container.style.height = `${container.clientHeight}px`;
      viewport.style.height = `${totalHeight}px`;
    };

    const findStartIndex = (scrollTop) => {
      let accumulatedHeight = 0;
      for (let i = 0; i < items.length; i++) {
        accumulatedHeight += itemHeights[i];
        if (accumulatedHeight > scrollTop) {
          return i;
        }
      }
      return 0;
    };

    const findEndIndex = (scrollTop) => {
      let accumulatedHeight = 0;
      for (let i = 0; i < items.length; i++) {
        accumulatedHeight += itemHeights[i];
        if (accumulatedHeight > scrollTop + container.clientHeight) {
          return i;
        }
      }
      return items.length - 1;
    };

    const initItemHeights = () => {
      const tempDiv = document.createElement('div');
      container.appendChild(tempDiv);

      items.forEach((item, index) => {
        tempDiv.innerHTML = item;
        itemHeights[index] = tempDiv.offsetHeight;
        totalHeight += itemHeights[index];
      });

      container.removeChild(tempDiv);
      viewport.style.height = `${totalHeight}px`;
    };

    initItemHeights();
    container.addEventListener('scroll', renderItems);
    renderItems();
  },
  unmounted(el) {
    el.removeEventListener('scroll', renderItems);
  }
};
