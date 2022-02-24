import { Button, Classes, Dialog } from "@blueprintjs/core";
import React from "react";
import { CONFIRMATION_REQUEST_EVENT } from "../../consts";

class ConfirmationModal extends React.Component {
  state = { modal: null, isModalOpen: false };

  componentDidMount() {
    window.addEventListener(CONFIRMATION_REQUEST_EVENT, ({ detail }) => {
      this.setState({ modal: detail, isModalOpen: true });
    });
  }

  handleClose = () => {
    this.setState({ modal: null, isModalOpen: false });
  }

  handleConfirm = () => {
    this.state.modal?.onConfirm?.();
    this.handleClose();
  }

  render() {
    if (this.state.modal) {
      return (
        <Dialog
          isOpen={this.state.isModalOpen}
          title={this.state.modal.title}
          onClose={this.handleClose}
          className={Classes.DARK}
        >
          <div className={Classes.DIALOG_BODY}>
            <p>{this.state.modal.body}</p>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={this.handleClose} intent={this.state.modal.cancelButton.view}>{this.state.modal.cancelButton.label}</Button>
              <Button onClick={this.handleConfirm} intent={this.state.modal.confirmButton.view}>{this.state.modal.confirmButton.label}</Button> 
            </div>
          </div>
        </Dialog>
      );
    }

    return null;
  }
}

export default ConfirmationModal;
