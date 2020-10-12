import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import LandingImage, { LandingImageProps } from "./LandingImage";
import {
  ITERATION_SIZE,
  fakeStore,
  casual
} from "../../utils/testUtils/testUtils";

const mockStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

describe("<LandingImage />", () => {
  it("renders", () => {
    mockStores.forEach(mockStore => {
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <LandingImage />
        </Provider>
      );

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockStores.forEach(mockStore => {
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <LandingImage />
        </Provider>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("appends classname to parent", () => {
    mockStores.forEach(mockStore => {
      const className = casual.string;
      const wrapper = enzyme.mount(
        <Provider store={mockStore}>
          <LandingImage className={className} />
        </Provider>
      );

      expect(wrapper.find("div").first().prop("className")).toEqual(className);
    });
  });
});
