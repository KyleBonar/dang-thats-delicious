import * as React from "react";
import queryString, { OutputParams } from "query-string";

import Article from "../../components/Article/Article";
import PageTitle from "../../components/PageTitle/PageTitle";
import TopBar from "../../components/TopBar/TopBar";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import FilterBar from "./components/FilterBar/FilterBar";
import Card from "../../components/Card/Card";
import styled from "styled-components";
import Pagination from "./components/pagination/Pagination";

const StyledArticle = styled(Article)`
  max-width: 1200px;
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const StyledCardHolder = styled.div`
  padding: 1em;
  width: 100%;
  box-sizing: border-box;
  max-width: 300px;
`;

const StyledCard = styled(Card)`
  margin: 0;
`;

export interface SaucesProps {
  location: { search: string };
}

export interface SaucesState {
  page: number;
  minPage: number;
  maxPage: number;
  total: number;
}

class Sauces extends React.Component<SaucesProps, SaucesState> {
  constructor(props: SaucesProps) {
    super(props);

    this.state = {
      page: 1,
      minPage: 1,
      maxPage: 10, // Will update this value from API
      total: 52 // Will update this value from API
    };
  }

  public componentDidMount() {
    const page: number = this.getPageFromPath(this.props.location.search);

    this.setState({ ...this.state, page });

    window.scrollTo(0, 0); // Move screen to top
  }

  public componentWillReceiveProps(props: SaucesProps) {
    // Going to compare current page vs page in URL
    const pageFromURL: number = this.getPageFromPath(props.location.search);
    const { page: pageFromState } = this.state;

    if (pageFromURL !== pageFromState) {
      this.setState({ ...this.state, page: pageFromURL });
    }

    window.scrollTo(0, 0); // Move screen to top
  }

  public render() {
    return (
      <div>
        <TopBar />
        <Navigation />
        <StyledArticle>
          <PageTitle>Sauces</PageTitle>
          <FilterBar />
          <StyledCardContainer>
            {new Array(8).fill(undefined).map((x, ind) => {
              return (
                <StyledCardHolder key={ind}>
                  <StyledCard
                    title="test"
                    imageLink="https://as.ftcdn.net/r/v1/pics/2fd8819a419c4245e5429905770db4b570661f48/home/discover_collections/Images.jpg"
                    description="description here"
                    author="John Davis Guy"
                    maker="Tasty sauces inc."
                    type="Hot Sauce"
                    to={`/sauce/?s=${5}`}
                  />
                </StyledCardHolder>
              );
            })}
          </StyledCardContainer>
          <Pagination
            total={this.state.total}
            page={this.state.page}
            limit={5}
            range={3}
          />
        </StyledArticle>
        <Footer />
      </div>
    );
  }

  private getPageFromPath(path: string): number {
    let page: number;
    // Get page from string
    const values: OutputParams = queryString.parse(path);
    // Make sure page is not undefined or an array
    if (!values.page || Array.isArray(values.page)) {
      page = 1;
    } else {
      // Make sure it's a valid number
      page = parseInt(values.page, 10);
      page = page > this.state.maxPage ? this.state.maxPage : page;
      page = page < this.state.minPage ? this.state.minPage : page;
    }

    return page;
  }
}

export default Sauces;
