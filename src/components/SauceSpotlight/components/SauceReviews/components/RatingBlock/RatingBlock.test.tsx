import * as React from "react";
import * as enzyme from "enzyme";

import RatingBlock, { IRatingBlock } from "./RatingBlock";
import {
  ITERATION_SIZE,
  casual
} from "../../../../../../utils/testUtils/testUtils";

const fakeRatingBlockProps = (): IRatingBlock => {
  return {
    txt: casual.random_element([undefined, casual.string]),
    rating: casual.random_element([undefined, casual.integer]),
    name: casual.string
  };
};
describe("<RatingBlock />", () => {
  let wrappers: any = [];
  let props: IRatingBlock[] = [];

  beforeAll(() => {
    wrappers = new Array(ITERATION_SIZE).fill(null).map(() => {
      const fakeProps = fakeRatingBlockProps();
      props.push(fakeProps);

      return enzyme.shallow(<RatingBlock {...fakeProps} />);
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });
});
