import { CONFIRMATION_REQUEST_EVENT } from "../consts";
import type { IConfirmationOptions, IConfirmationService } from "./types";

class ConfirmationService implements IConfirmationService {
    requestConfirmation ({
        title = 'Are you sure?',
        body = 'Confirm your action',
        onConfirm,
        confirmButton: { label: confirmationLabel = 'Yes, I am', view: confirmationView = 'danger' } = {},
        cancelButton: { label: cancelnButtonLabel = 'Cancel', view: cancelButtonView } = {}
    }: IConfirmationOptions) {
        window.dispatchEvent(new CustomEvent<IConfirmationOptions>(CONFIRMATION_REQUEST_EVENT, {
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
