import React from "react";
import styles from "./modal.module.css";
import clsx from "clsx";

function Modal({ showModal, setShowModal, handleOnClickYes }) {
  const modalRef = React.useRef(null);

  const handleOverlayClick = (e) => {
    if (!modalRef.current.contains(e.target)) {
      setShowModal(false); // Đóng modal khi nhấn ngoài modal
    }
  };

  if (!showModal) return null; // Nếu không có modal thì không hiển thị

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div ref={modalRef} className={styles.modalContent}>
        <h3>Bạn muốn xóa lịch sử tìm kiếm?</h3>
        <div className={styles.modalButton}>
          <button
            className={styles.cancel}
            onClick={() => setShowModal(false)}
          >
            Hủy
          </button>
          <button className={styles.delete} onClick={handleOnClickYes}>
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
