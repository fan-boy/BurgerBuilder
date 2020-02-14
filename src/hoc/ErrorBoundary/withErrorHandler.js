import React, { Component } from 'react';
import Auxiliary from '../auxiliary';
import Modal from '../../Components/UI/Modal/Modal';

const withErrorBoundary = (WrappedComponent,axios) =>{
    return class extends Component {
        state = {
            error:null
        }
        componentDidMount(){
            
            axios.interceptors.request.use(req =>{
                this.setState({error:null});
                return req;
            });
            axios.interceptors.response.use(res => res , error =>{
                this.setState({error : error});
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
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
    
                </Auxiliary>
    
            );    
        }
    }
}

export default withErrorBoundary;