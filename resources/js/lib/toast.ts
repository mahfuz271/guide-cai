import Swal, { SweetAlertIcon } from 'sweetalert2';

export const sweetAlertToastConfig = {
    position: 'top-end' as const,
    timer: 4000,
    showConfirmButton: false,
    timerProgressBar: true,
    pauseOnHover: true,
    pauseOnFocusLoss: true,
    draggable: true,
    limit: 4,
};

let activeToasts = 0;

const Toast = Swal.mixin({
    toast: true,
    position: sweetAlertToastConfig.position,
    showConfirmButton: sweetAlertToastConfig.showConfirmButton,
    timer: sweetAlertToastConfig.timer,
    timerProgressBar: sweetAlertToastConfig.timerProgressBar,
    didOpen: (toast: HTMLElement) => {
        if (sweetAlertToastConfig.pauseOnHover) {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
        if (sweetAlertToastConfig.pauseOnFocusLoss) {
            window.addEventListener('blur', Swal.stopTimer);
            window.addEventListener('focus', Swal.resumeTimer);
        }
    },
});

/**
 * Display a toast with icon and message.
 * Manages max active toasts limit.
 */
const showToast = (icon: SweetAlertIcon, message: string): void => {
    if (activeToasts >= sweetAlertToastConfig.limit) {
        return;
    }
    activeToasts++;
    Toast.fire({
        icon,
        title: message,
    }).finally(() => {
        activeToasts--;
    });
};

export const toast = {
    success: (msg: string) => showToast('success', msg),
    error: (msg: string) => showToast('error', msg),
    info: (msg: string) => showToast('info', msg),
    warning: (msg: string) => showToast('warning', msg),
};

/**
 * Show a delete confirmation dialog.
 * @param itemName - The name or description of the item to delete (for UI)
 * @returns Promise<boolean> - Resolves to true if confirmed, false otherwise
 */
export const confirmDelete = (itemName: string = 'this item'): Promise<boolean> => {
    return Swal.fire({
        title: `Are you sure you want to delete ${itemName}?`,
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#057a55',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        reverseButtons: true,
    }).then((result) => result.isConfirmed);
};

/**
 * Show a simple confirmation dialog with customizable text.
 * @returns Promise<boolean> - Resolves to true if confirmed, false otherwise
 */
export function confirmDialog({
    title = 'Are you sure?',
    text = null,
    confirmButtonText = 'Yes',
    cancelButtonText = 'Cancel',
}: {
    title?: string;
    text?: string | null;
    confirmButtonText?: string;
    cancelButtonText?: string;
} = {}): Promise<boolean> {
    return Swal.fire({
        title,
        text: text ?? undefined,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#057a55',
        confirmButtonText,
        cancelButtonText,
        reverseButtons: true,
    }).then((result) => result.isConfirmed);
}
