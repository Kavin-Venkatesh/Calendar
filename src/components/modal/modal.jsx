import styles from "./modal.module.css";

const Modal = ({ isOpen, title, children, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
        <div className={styles.modal}>
            <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>{title}</h2>
            <button className={styles.modalClose} onClick={onClose}>
                &times;
            </button>
            </div>
            <div className={styles.modalBody}>{children}</div>
            <div className={styles.modalFooter}>
            <button className={styles.btnSecondary} onClick={onClose}>
                Cancel
            </button>
            <button className={styles.btnPrimary} onClick={onConfirm}>
                Confirm
            </button>
            </div>
        </div>
        </div>

  );
};

export default Modal;
