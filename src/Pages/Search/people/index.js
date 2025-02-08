import React from "react";
import { searchPeople } from "~/services/apiEndpoint";
import { get } from "~/services/callApi";
import styles from "./people.module.css";
import clsx from "clsx";

function People() {
  const keyword = new URLSearchParams(window.location.search).get("q");
  const [people, setPeople] = React.useState([]);
  const [loading, setLoading] = React.useState(false); // Thêm trạng thái loading
  const [error, setError] = React.useState(null); // Thêm trạng thái lỗi

  React.useEffect(() => {
    if (!keyword) return; // Nếu không có keyword thì không thực hiện API

    setLoading(true); // Bắt đầu tải dữ liệu
    get(searchPeople, { keyword: keyword }, true)
      .then((res) => {
        console.log(res);
        setPeople(res.data.data.data);
        setLoading(false); // Kết thúc tải dữ liệu
      })
      .catch((err) => {
        console.log(err);
        setError("Có lỗi xảy ra, vui lòng thử lại!"); // Xử lý lỗi
        setLoading(false); // Kết thúc tải dữ liệu
      });
  }, [keyword]); // Khi keyword thay đổi, useEffect sẽ chạy lại

  // Hàm render các nút hành động dựa trên trạng thái
  function renderActionButton(status) {
    switch (status) {
      case "NOT_FRIEND":
        return (
          <button className={clsx(styles.addFriendButton)}>
            Thêm bạn bè
          </button>
        );
      case "SENT":
        return (
          <button className={clsx(styles.cancelRequestButton)}>
            Hủy lời mời
          </button>
        );
      case "FRIEND":
        return (
          <button className={clsx(styles.messageButton)}>
            Nhắn tin
          </button>
        );
      case "RECEIVED":
        return (
          <div>
            <button className={clsx(styles.acceptButton)}>
              Chấp nhận
            </button>
            <button className={clsx(styles.rejectButton)}>
              Từ chối
            </button>
          </div>
        );
      default:
        return null; // Không có nút nếu không có trạng thái phù hợp
    }
  }

  if (loading) {
    return <div>Đang tải...</div>; // Hiển thị trạng thái loading
  }

  if (error) {
    return <div>{error}</div>; // Hiển thị thông báo lỗi nếu có
  }

  return (
    <div className={clsx(styles.main)}>
        
      {people.length === 0 ? (
        <div>Không có kết quả tìm kiếm.</div>
      ) : (
        people.map((item) => (
          <div key={item.id} className={clsx(styles.people)}>
            <span>
              <img src={item.avatar} alt="avatar" />
              <span>{item.fullName}</span>
            </span>
            <span>{renderActionButton(item.status)}</span>
          </div>
        ))
      )}
   
    </div>
  );
}

export default People;
