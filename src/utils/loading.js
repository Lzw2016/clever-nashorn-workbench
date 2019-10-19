import layer from "layer";
import lodash from "lodash";

const start = (wait = 200) => {
  const loadingAttr = {
    clearIndex: null,
    closeIndex: null,
    done: false,
  };
  loadingAttr.clearIndex = setTimeout(() => {
    if (!loadingAttr.done) {
      loadingAttr.closeIndex = layer.load(1);
    }
  }, lodash.toNumber(wait));
  return loadingAttr;
};

const done = (loadingAttr) => {
  loadingAttr.done = true;
  clearTimeout(loadingAttr.clearIndex);
  if (loadingAttr.closeIndex !== null) {
    layer.close(loadingAttr.closeIndex);
  }
};

const loading = { start, done };
export {
  loading
};
