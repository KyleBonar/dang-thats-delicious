import * as React from "react";
import * as enzyme from "enzyme";

import Body, { IBodyProps } from "./Body";
import { casual, ITERATION_SIZE } from "../../../utils/testUtils/testUtils";

const fakeBody = (): IBodyProps => ({
  title: casual.random_element([undefined, casual.string]),
  description: casual.random_element([undefined, casual.string])
});

describe("<Body />", () => {
  const defaultText = "Loading ...";
  it("renders", () => {
    const wrapper = enzyme.shallow(<Body />);

    expect(wrapper).toBeTruthy();
  });

  it("matches snapshot", () => {
    const wrapper = enzyme.shallow(<Body />);

    expect(wrapper).toMatchSnapshot();
  });
});
