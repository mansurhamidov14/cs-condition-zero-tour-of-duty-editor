import { CONFIRMATION_REQUEST_EVENT } from "../consts";

class ConfirmationService {
    requestConfirmation ({
        title = 'Are you sure?',
        body = 'Confirm your action',
        onConfirm,
        confirmButton: { label: confirmationLabel = 'Yes, I am', view: confirmationView = 'danger' } = {},
        cancelButton: { label: cancelnButtonLabel = 'Cancel', view: cancelButtonView } = {}
    }) {
        window.dispatchEvent(new CustomEvent(CONFIRMATION_REQUEST_EVENT, {
            detail: {
                title,
                body,
                confirmButton: { label: confirmationLabel, view: confirmationView },
                cancelButton: { label: cancelnButtonLabel, view : cancelButtonView },
                onConfirm
            }
        }));
    }
}

export default ConfirmationService;