import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";
import { Provider } from "react-redux";

import UpdateEmail from "./UpdateEmail";
import {
  casual,
  fakeStore,
  ITERATION_SIZE
} from "../../utils/testUtils/testUtils";

describe("<UpdateEmail />", () => {
  const wrappers: any = [];

  beforeAll(() => {
    // push our mounted component into array
    new Array(ITERATION_SIZE).forEach(() => {
      wrappers.push(
        enzyme.mount(
          <Provider store={fakeStore()}>
            <UpdateEmail />
          </Provider>
        )
      );
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toBeTruthy();
    });
  });
});
