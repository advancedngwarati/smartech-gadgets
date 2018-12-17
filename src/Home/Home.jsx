import React, { Component } from 'react';
import { Card, Grid, Header } from 'semantic-ui-react';
import axios from 'axios';

class Home extends Component{

    state = {
        filterKey:"",
        filterVal:"",
        products:[],
        name:'',
        category:'',
        price:'',
        image:[],
        description:'',
        brand:''

    };

    getProducts = () => {
        let url = "http://backend.test/products";
        axios.get(url).then(response => {
            this.setState({
                products: response.data
            });
        }); 
    }

    componentDidMount = () =>{
        this.getProducts();
    }

    render(){
        const {filterKey,filterVal} = this.state;
        
        let productsData = this.state.products;
        if(filterKey !== "") 
        productsData.filter(product => product[filterKey] === filterVal);
        const productsView  = productsData.map(product => {
                return (
                    <Grid.Column key={product.id}>
                        <Card
                            image={product.image}
                            header={product.name}
                            meta={product.price}
                            description={product.description}
                            extra={product.brand}
                        />
                    </Grid.Column>
                );
            });

        let view;
        if (productsData.length <= 0) {
        view = <Header as='h1' />;
        } else {
        view = (
            <Grid relaxed columns={4}>
                {productsView}
            </Grid>
        );
        }

        return(
            <div className='home-wrapper'>
                {view}
            </div>
        );
    };
};

export default Home;