import "./index.css";
import ForegroundColors from "./ForegroundColors"
import "./BackgroundColors"
import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import Padding from "./Padding";
import Margins from "./Margins";
import Corners from "./Corners";
import Dimensions from "./Dimensions";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import GridLayout from "./GridLayout";
import Flex from "./Flex";
import ReactIconsSampler from "./ReactIcons";
import { Container } from "react-bootstrap";
import BootstrapGrids from "./BootstrapGrids";
import ScreenSizeLabel from "./ScreenSizeLabel";
import BootstrapTables from "./BootstrapTables";
import BootstrapLists from "./BootstrapLists";
import BootstrapForms from "./BootstrapForms";
import BootstrapSwitches from "./BootstrapSwitches";
import BootstrapSlider from "./BootstrapSlider";
import BootstrapAddons from "./BootstrapAddons";
import BootstrapResponsiveForms from "./BootstrapResponsiveForms";
import BootstrapNavigation from "./BootstrapNavigation";
import BootstrapCards from "./BootstrapCards";

export default function Lab2() {
  return (
    <Container>
      <div id="wd-lab2">
        <h2>Lab 2 - Cascading Style Sheets</h2>
        <h3>Styling with the STYLE attribute</h3>
        …
        <div id="wd-css-id-selectors">
          <h3>ID selectors</h3>
          <p className="wd-class-selector">
            Instead of changing the look and feel of all the
            elements of the same name, e.g., P, we can refer to a specific element by its ID
          </p>
          <p className="wd-class-selector">
            Here's another paragraph using a different ID and a different look and
            feel
          </p>
        </div>
        <div id="wd-css-document-structure">
          <div className="wd-selector-1">
            <h3>Document structure selectors</h3>
            <div className="wd-selector-2">
              Selectors can be combined to refer elements in particular
              places in the document
              <p className="wd-selector-3">
                This paragraph's red background is referenced as
                <br />
                .selector-2 .selector3 <br />
                meaning the descendant of some ancestor. <br />
                <span className="wd-selector-4">
                  Whereas this span is a direct child of its parent
                </span><br />
                You can combine these relationships to create specific
                styles depending on the document structure
              </p>
            </div>
          </div>
        </div>
        <ForegroundColors />
        <BackgroundColors />
        <Borders />
        <Padding />
        <Margins />
        <Corners />
        <Dimensions />
        <Positions />
        <Zindex />
        <Float />
        <GridLayout />
        <Flex />
        <ReactIconsSampler />
        <BootstrapGrids />
        <ScreenSizeLabel />
        <BootstrapTables />
        <BootstrapLists />
        <BootstrapForms />
        <BootstrapSwitches />
        <BootstrapSlider />
        <BootstrapAddons />
        <BootstrapResponsiveForms />
        <BootstrapNavigation />
        <BootstrapCards />
      </div>
    </Container>
  );
}

