import * as React from "react";
import * as enzyme from "enzyme";

import SauceReviewBlock, { SauceReviewBlockProps } from "./SauceReviewBlock";

import {
  fakeReview,
  ITERATION_SIZE
} from "../../../../../../utils/testUtils/testUtils";

const fakeSauceReviewBlocks = (): SauceReviewBlockProps => {
  return {
    review: fakeReview()
  };
};

describe("<SauceReviewBlock />", () => {
  let wrappers: any = [];
  let props: SauceReviewBlockProps[] = [];

  beforeAll(() => {
    wrappers = new Array(ITERATION_SIZE).fill(null).map(() => {
      // Generate props
      const fakeProp = fakeSauceReviewBlocks();

      // Add props to collector
      props.push(fakeProp);

      return enzyme.shallow(<SauceReviewBlock {...fakeProp} />);
    });
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.exists()).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders a Button component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("Button").exists()).toBeTruthy();
    });
  });

  it("renders an AuthorBlock component", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper.find("AuthorBlock").exists()).toBeTruthy();
    });
  });
});
