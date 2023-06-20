import { Toast } from "react-bootstrap";

interface interfToast {
    show: boolean;
    message: string;
    colors?: string;
    onClose: () => void;
}
export const ToastComponent = (props: interfToast) => {
    return (
        <Toast
            onClose={props.onClose}
            show={props.show}
            delay={3000}
            autohide
            bg={props?.colors ? props.colors : 'success'}
            style={{
                position: 'absolute',
                zIndex: 1021,
                right: 0
            }}
        >
            <Toast.Body style={{
                color: '#fff'
            }}>
                {props.message}
            </Toast.Body>
        </Toast>
    )
}