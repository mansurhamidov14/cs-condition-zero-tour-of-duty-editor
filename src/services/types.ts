import type { Intent } from "@blueprintjs/core";

export interface IConfirmationService {
    requestConfirmation: (options: IConfirmationOptions) => void;
}

export interface IConfirmationOptions {
    title: string;
    body: string;
    onConfirm: () => void;
    confirmButton?: IConfirmationModalButton;
    cancelButton?: IConfirmationModalButton;
}

export interface IConfirmationModalButton {
    label?: string;
    view?: Intent
}