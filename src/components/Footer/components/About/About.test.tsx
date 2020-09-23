import * as React from "react";
import * as enzyme from "enzyme";

import About from "./About";
import { casual } from "../../../../utils/testUtils/testUtils";

describe("<About />", () => {
  it("renders", () => {
    const wrapper = enzyme.shallow(<About />);
    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = enzyme.shallow(<About />);
    expect(wrapper).toMatchSnapshot();
  });

  it("concats classname on parent div", () => {
    const extraClasses = casual.string;
    const wrapper = enzyme.shallow(<About className={extraClasses} />);

    expect(wrapper.find("div").props().className).toContain(extraClasses);
  });
});
