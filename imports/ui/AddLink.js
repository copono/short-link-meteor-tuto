import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        url: '',
        isOpen: false,
        error: ''
    };
    this.urlRef = React.createRef();
    }
    onSubmit(e){
        e.preventDefault();
        const {url} = this.state;
        Meteor.call('links.insert', url, (err, res)=>{
            if(!err) {
                this.handleModalClose();
            } else {
                this.setState({error: err.reason})
            }
        });
        //this.urlRef.current.value = '';
    }
    onChange(e) {
        this.setState({
            url: e.target.value
        })
    }
    handleModalClose(){
        this.setState({isOpen:false, url:'', error:''})
    }
    render () {
        return (
            <div>
                <button onClick={()=> this.setState({isOpen: true})}
                    className="button"> + Add Link</button>
                <Modal 
                    isOpen={this.state.isOpen} 
                    conentLabel="Add link" 
                    ariaHideApp={false}
                    onAfterOpen={()=>this.urlRef.current.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal">
                    <h1>Add Link</h1>
                    {this.state.error?<p>{this.state.error}</p>:undefined}
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input 
                            type="text" 
                            //ref={this.urlRef} 
                            placeholder="URL" 
                            ref = {this.urlRef}
                            value={this.state.url}
                            onChange={this.onChange.bind(this)}
                        />
                        <button className="button">Add Link</button>
                        {/*This button is in the form for alignment only. 
                            Note that the type is overriden so it doesn't 
                            submit.*/}
                        <button className="button button--secondary" type="button" onClick={this.handleModalClose.bind(this)}>Close</button>
                    </form>
                </Modal>
            </div>
    )}
}