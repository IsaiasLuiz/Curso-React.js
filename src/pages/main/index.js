import React, {Component} from 'react';
import api from '../../services/api';
import './styles.css'
import {Link} from 'react-router-dom'

export default class extends Component{
  state = {
    products: [],
    productInfo: {},
    page: 1,
  };

  componentDidMount(){
    this.loadProducts();
  };

  loadProducts = async (page = 1) =>{
    try{
      const response = await api.get(`/products?page=${page}`);
      const { docs, ...productInfo } = response.data;
      this.setState({ products: docs, productInfo });
    }catch(error){
      
    }
  };

  prevPage = () =>{
    const {page} = this.state;
    if(page === 1) return;
    const pageNumber = page -1;
    this.setState({page: pageNumber})
    this.loadProducts(pageNumber);
  };

  nextPage = () =>{
    const {page, productInfo} = this.state;
    if(page === productInfo.pages) return;
    const pageNumber = page + 1;
    this.setState({page: pageNumber})
    this.loadProducts(pageNumber);
  };

  render(){
    const {products} = this.state;
    return(
      <div className="product-list">
        { products.map(product =>(
          <article key={product._id}>
          <strong>{product.title}</strong>
          <p>{product.description}</p>
          <Link to={`/products/'${product._id}`}>Acesar</Link>
          </article>
        )) }
        <div className="actions">
          <button onClick={this.prevPage} disabled={this.state.page === 1}>anterior</button>
          <button onClick={this.nextPage} disabled={this.state.page === this.state.productInfo.pages}>proximo</button>
        </div>
      </div>
    )
  };
}