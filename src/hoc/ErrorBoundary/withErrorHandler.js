import React, { Component } from 'react';
import Auxiliary from '../auxiliary';
import Modal from '../../Components/UI/Modal/Modal';

const withErrorBoundary = (WrappedComponent,axios) =>{
    return class extends Component {
        state = {
            error:null
        }
        componentDidMount(){
            axios.interceptors.response.use(req =>{
                this.setState({error : null});
                return req;
            });
            axios.interceptors.response.use(null,error =>{
                this.setState({error : error});
                return response;
            });
        }
        errorConfirmedHandler = () => {
            this.setState({error:null});

        }
        render(){
            return(
                <Auxiliary>
                    <Modal show = {this.state.error } backDropClicked = {this.errorConfirmedHandler}>
                        Something didn't work!
                    </Modal>
                    <WrappedComponent {...this.props} />
    
                </Auxiliary>
    
            );    
        }
    }
}