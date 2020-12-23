import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";
import { MockStoreEnhanced } from "redux-mock-store";
import { ReactWrapper } from "enzyme";

import {
  fakeStore,
  ITERATION_SIZE
} from "../../../../utils/testUtils/testUtils";

import SauceNewestReviews from "./SauceNewestReviews";

describe("<SauceNewestReviews />", () => {
  let wrappers: ReactWrapper<
    any,
    Readonly<{}>,
    React.Component<{}, {}, any>
  >[] = [];
  let fakeStores: MockStoreEnhanced<unknown, {}>[] = [];

  beforeAll(() => {
    fakeStores = new Array(ITERATION_SIZE).fill(null).map(fakeStore);

    wrappers = new Array(ITERATION_SIZE).fill(null).map((x, ind) => {
      return enzyme.mount(
        <Provider store={fakeStores[ind]}>
          <SauceNewestReviews />
        </Provider>
      );
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });
});
