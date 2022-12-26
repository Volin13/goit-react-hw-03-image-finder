import { ImageGellery, SearchBar } from '../components/index';
import { Component } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  margin: 0 auto 20px;
  width: 80%;
  position: relative;
`;
export class App extends Component {
  state = {
    query: '',
    showModal: false,
  };

  pictureQuery = query => {
    this.setState({
      query,
      page: 1,
    });
  };
  notify = message => toast.error(message);

  render() {
    const { query } = this.state;
    return (
      <Container>
        <SearchBar pictureQuery={this.pictureQuery} />
        <ImageGellery query={query} notify={this.notify} />
        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      </Container>
    );
  }
}
