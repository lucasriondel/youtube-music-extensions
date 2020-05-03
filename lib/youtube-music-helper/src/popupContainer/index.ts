import computeContext from "./context";
import createMenuItem, {
  IPaperIconButtonAttributes,
  menuItemContainerBaseClass,
} from "./createMenuItem";
import hide from "./hide";
import insertButtons from "./insertButtons";
import log from "./log";
import onDisplay from "./onDisplay";

const popupContainer = {
  menuItemContainerBaseClass,
  createMenuItem,
  computeContext,
  hide,
  insertButtons,
  onDisplay,
  log,
};

export { IPaperIconButtonAttributes };

export default popupContainer;
