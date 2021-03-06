import React, { Component } from 'react';
import CreateInvoice from './CreateInvoice';
import { Popover, Button,  ButtonToolbar, OverlayTrigger } from 'react-bootstrap';
import DeleteInvoice from './DeleteInvoice';
import FontAwesome from 'react-fontawesome';



class DeleteInvoiceButton extends Component {
  constructor() {
    super()

    this.state = {
      show: false
    }
    this.toggle = this.toggle.bind(this)
  }

  //toggle is used to help close the modal after hitting delete.
  toggle() {
    if (!this.state.show) {
      // I needed a manual way open/close and used react-bootstrap's
      //native methods i.e. overlay.show() overlay.hide()
      this.refs.overlay.show();
      this.setState({
        show: !this.state.show
      })
    } else {
      this.refs.overlay.hide();
      this.setState({
        show: !this.state.show
      });
    }
  }


  render () {
    return (
      <ButtonToolbar >
        <OverlayTrigger
          rootClose={true}
          ref="overlay"
          trigger="manual"
          placement="left"
          overlay={
            <Popover id="popover-positioned-left" className='popover-form-fields'>
              {<DeleteInvoice invoice={this.props.invoice} hide={this.toggle}/>}
            </Popover>
          }
        >
          <FontAwesome onClick={this.toggle} name='remove' size='lg' className='delete-button'/>
        </OverlayTrigger>
      </ButtonToolbar>
    );
  }
}

export default DeleteInvoiceButton;
