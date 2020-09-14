import * as React from "react";
import * as enzyme from "enzyme";
import List from "./List";

import { fakeLists } from "../../utils/testUtils/testUtils";
import { MockList } from "../../utils/testUtils/types";

const mockLists: MockList[] = fakeLists();

describe("<List />", () => {
  it("renders", () => {
    mockLists.forEach((mockList: MockList) => {
      const wrapper = enzyme.shallow(<List {...mockList}></List>);

      expect(wrapper).toBeTruthy();
    });
  });

  it("matches snapshot", () => {
    mockLists.forEach((mockList: MockList) => {
      const wrapper = enzyme.shallow(<List {...mockList}></List>);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it("renders correct title", () => {
    mockLists.forEach((mockList: MockList) => {
      const wrapper = enzyme.shallow(<List {...mockList}></List>);

      expect(wrapper.find("h5").text()).toEqual(mockList.title);
    });
  });

  it("renders correct number of list items", () => {
    mockLists.forEach((mockList: MockList) => {
      const wrapper = enzyme.shallow(<List {...mockList}></List>);

      expect(wrapper.find("li").length).toEqual(mockList.items.length);
    });
  });

  // it("renders correct list item texts", () => {
  //   wrapper.find("li").map((ind, node) => {
  //     // li -> a -> text -> data (same as text())
  //     expect(node.children[0].children[0].data).toEqual(items[ind].text);
  //   });
  // });

  // it("renders correct list item link", () => {
  //   wrapper.find("li").map((ind, node) => {
  //     // li -> a
  //     expect(node.children[0].attribs.href).toEqual(items[ind].link || "#");
  //   });
  // });
});
