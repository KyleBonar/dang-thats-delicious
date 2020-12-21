import "jsdom-global/register";
import * as React from "react";
import * as enzyme from "enzyme";

import SauceHero, { SauceHeroProps } from "./SauceHero";
import {
  fakeSauce,
  ITERATION_SIZE,
  casual
} from "../../../../utils/testUtils/testUtils";
// import { IuseSauceBySlug } from "../../../../utils/hooks/useSauceBySlug/useSauceBySlug";
// import { ISauce } from "../../../../redux/sauces/types";
// import { FlashMessageProps } from "../../../FlashMessage/FlashMessage";
import { ShallowWrapper } from "enzyme";

// let mockLoading = false;
// let mockSauce: undefined | ISauce = undefined;
// let mockError: FlashMessageProps = {
//   isVisible: false
// };
// const mockGetTheSauce = jest.fn();
// jest.mock("../../../../utils/hooks/useSauceBySlug/useSauceBySlug", () => {
//   // noinspection JSUnusedGlobalSymbols
//   return {
//     useSauceBySlug(): IuseSauceBySlug {
//       return {
//         loading: mockLoading,
//         sauce: mockSauce,
//         error: mockError,
//         getTheSauce: mockGetTheSauce
//       };
//     }
//   };
// });
window.moveTo = jest.fn();

describe("<SauceHero />", () => {
  // defaults from component
  const _loadingTxt = "loading...";
  const _noSauceTxt = "Could not find sauce!";
  const _defaultImagePath =
    "https://res.cloudinary.com/foryourthoughts/image/upload/v1565275178/sauces/ra1o7bsr9v2eurosoo5y.png";

  // May need to refer to these later so initializing out here
  let wrappers: ShallowWrapper<
    any,
    React.Component["state"],
    React.Component
  >[] = [];

  const fakeSauceHeroProps: SauceHeroProps[] = [];
  // let mockStores: MockStoreEnhanced<unknown, unknown>[] = [];

  beforeAll(() => {
    // add our mounts
    wrappers = new Array(ITERATION_SIZE).fill(null).map((x, ind) => {
      fakeSauceHeroProps.push({
        sauce: fakeSauce(),
        error: { isVisible: casual.boolean, text: casual.string },
        loading: casual.boolean
      });

      return enzyme.shallow(<SauceHero {...fakeSauceHeroProps[ind]} />);
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    // reset
    // mockLoading = false;
    // mockSauce = undefined;
    // mockError = {
    //   isVisible: false
    // };
  });

  it("renders", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    wrappers.forEach(wrapper => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  // it("calls hook API method on load", () => {
  //   // set so we can call api method
  //   mockSauce = undefined;
  //   mockLoading = false;
  //
  //   mockStores.forEach(mockStore => {
  //     mockGetTheSauce.mockClear();
  //
  //     // mount up the component
  //     enzyme.mount(
  //       <Provider store={mockStore}>
  //         <SauceHero />
  //       </Provider>
  //     );
  //
  //     // Check if the function was ran or not
  //     expect(mockGetTheSauce).toHaveBeenCalledTimes(1);
  //   });
  // });

  it("renders loading text when loading", () => {
    // mockSauce = undefined;
    // mockLoading = true;

    wrappers.forEach((wrapper, ind) => {
      if (!fakeSauceHeroProps[ind].loading) return;

      expect(wrapper.text()).toEqual(_loadingTxt);
    });
  });

  it("renders sauce not found text when there is no sauce", () => {
    // mockSauce = undefined;
    // mockLoading = false;

    wrappers.forEach((wrapper, ind) => {
      const sauce = fakeSauceHeroProps[ind].sauce;
      if (sauce) return;

      expect(wrapper.text()).toEqual(_noSauceTxt);
    });
  });

  it("renders error text when there is an error", () => {
    // mockSauce = undefined;
    // mockLoading = false;
    // mockError = { isVisible: true, text: casual.string };

    wrappers.forEach((wrapper, ind) => {
      const { error, loading } = fakeSauceHeroProps[ind];

      if (loading) return;
      if (!error.isVisible) return;

      expect(wrapper.text()).toEqual(error.text);
    });
  });

  it("renders the sauce's image when sauce is found with a photo and is not loading", () => {
    // const sauce = fakeSauce();
    // sauce.photo = casual.url; // force an image
    // mockSauce = sauce;
    // mockLoading = false;

    wrappers.forEach((wrapper, ind) => {
      const sauce = fakeSauceHeroProps[ind].sauce;

      if (fakeSauceHeroProps[ind].loading) return;
      if (!sauce) return;
      if (!sauce.photo) return;
      if (fakeSauceHeroProps[ind].error.isVisible) return;

      expect(wrapper.find("img").exists()).toBeTruthy();
      expect(wrapper.find("img").first().prop("src")).toEqual(sauce.photo);
    });
  });

  it("renders the default image when sauce is found but has no image and is not loading", () => {
    // const sauce = fakeSauce();
    // sauce.photo = undefined; // force default
    // mockSauce = sauce;
    // mockLoading = false;

    wrappers.forEach((wrapper, ind) => {
      const sauce = fakeSauceHeroProps[ind].sauce;

      if (fakeSauceHeroProps[ind].loading) return;
      if (!sauce) return;
      if (sauce.photo) return;
      if (fakeSauceHeroProps[ind].error.isVisible) return;

      expect(wrapper.find("img").exists()).toBeTruthy();
      expect(wrapper.find("img").first().prop("src")).toEqual(
        _defaultImagePath
      );
    });
  });

  it("renders the sauce's title when sauce is found and not loading", () => {
    // const sauce = fakeSauce();
    // mockSauce = sauce;
    // mockLoading = false;

    wrappers.forEach((wrapper, ind) => {
      const sauce = fakeSauceHeroProps[ind].sauce;

      if (fakeSauceHeroProps[ind].loading) return;
      if (!sauce) return;
      if (fakeSauceHeroProps[ind].error.isVisible) return;

      expect(wrapper.find("h2").exists()).toBeTruthy();
      expect(wrapper.find("h2").first().text()).toEqual(sauce.name);
    });
  });

  it("renders the sauce's maker when sauce is found and not loading", () => {
    // const sauce = fakeSauce();
    // mockSauce = sauce;
    // mockLoading = false;

    wrappers.forEach((wrapper, ind) => {
      const sauce = fakeSauceHeroProps[ind].sauce;

      if (fakeSauceHeroProps[ind].loading) return;
      if (!sauce) return;
      if (fakeSauceHeroProps[ind].error.isVisible) return;

      expect(wrapper.find("[data-test-id='maker']").text()).toContain(
        sauce.maker
      );
    });
  });

  it("renders the sauce's ingredients when sauce is found and not loading", () => {
    // const sauce = fakeSauce();
    // mockSauce = sauce;
    // mockLoading = false;

    wrappers.forEach((wrapper, ind) => {
      const sauce = fakeSauceHeroProps[ind].sauce;

      if (fakeSauceHeroProps[ind].loading) return;
      if (!sauce) return;
      if (!sauce.ingredients) return;
      if (fakeSauceHeroProps[ind].error.isVisible) return;

      expect(wrapper.find("[data-test-id='ingredients']").text()).toContain(
        sauce.ingredients
      );
    });
  });

  it("renders the sauce's types when sauce is found and not loading", () => {
    // const sauce = fakeSauce();
    // mockSauce = sauce;
    // mockLoading = false;

    wrappers.forEach((wrapper, ind) => {
      const sauce = fakeSauceHeroProps[ind].sauce;

      if (fakeSauceHeroProps[ind].loading) return;
      if (!sauce) return;
      if (!sauce.types) return;
      if (fakeSauceHeroProps[ind].error.isVisible) return;

      expect(wrapper.find("[data-test-id='type']").text()).toContain(
        sauce.types.join(", ")
      );
    });
  });

  it("renders the sauce's shu when sauce is found and not loading", () => {
    // const sauce = fakeSauce();
    // mockSauce = sauce;
    // mockLoading = false;

    wrappers.forEach((wrapper, ind) => {
      const sauce = fakeSauceHeroProps[ind].sauce;

      if (fakeSauceHeroProps[ind].loading) return;
      if (!sauce) return;
      if (!sauce.shu) return;
      if (fakeSauceHeroProps[ind].error.isVisible) return;

      expect(wrapper.find("[data-test-id='shu']").text()).toContain(sauce.shu);
    });
  });

  it("renders the sauce's country when sauce is found and not loading", () => {
    // const sauce = fakeSauce();
    // mockSauce = sauce;
    // mockLoading = false;

    wrappers.forEach((wrapper, ind) => {
      const sauce = fakeSauceHeroProps[ind].sauce;

      if (fakeSauceHeroProps[ind].loading) return;
      if (!sauce) return;
      if (!sauce.country) return;
      if (fakeSauceHeroProps[ind].error.isVisible) return;

      expect(wrapper.find("[data-test-id='country']").text()).toContain(
        sauce.country
      );
    });
  });
});
