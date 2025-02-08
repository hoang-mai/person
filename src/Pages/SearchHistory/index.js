import clsx from "clsx";
import styles from "./searchHistory.module.css";
import Button from "~/Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBars,
  faCalendarAlt,
  faCalendar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { get, post } from "~/services/callApi";
import { vi } from "date-fns/locale/vi";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, set } from "date-fns";
import Select from "react-select";
import {
  deleteSearchHistory,
  deleteSearchHistoryAll,
  findSearchHistoryToFrom,
  findSearchHistoryYearMonthDay,
  searchHistory,
} from "~/services/apiEndpoint";
import Body from "~/Components/Layouts/body";
import Modal from "~/Components/Modal";
import { LoaderPeople } from "~/Components/Loader";
function SearchHistory() {
  const handleOnClickYes = () => {
    get(deleteSearchHistoryAll, {}, true)
      .then((response) => {
        console.log(response);
        setResultSearchHistory({});
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minWidth: "60px", // Không cho phép nhỏ hơn
      backgroundColor: "transparent",
    }),
    menu: (provided, state) => ({
      ...provided,
      width: "100px",
      backgroundColor: "white",
    }),
  };
  const [focus, setFocus] = React.useState(1);
  const [day, setDay] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");
  const [selectedToDate, setSelectedToDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedFromDate, setSelectedFromDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );

  const [resultSearchHistory, setResultSearchHistory] = React.useState({});

  const [loading, setLoading] = React.useState(false);
  const [loadingScroll, setLoadingScroll] = React.useState(false);
  const loadingRef = React.useRef(false);
  const pageNoRef = React.useRef(0);
  const hasMoreData = React.useRef(true);
  const saveChangeRef = React.useRef(true);
  const scrollContainerRef = React.useRef(null);
  const [showModal, setShowModal] = React.useState(false);
  const fetchData = (response) => {
    const rawData = response.data.data.data;

    let groupedData = {};
    let currentGroup = [];
    let lastDate = null;

    rawData.forEach((item, index) => {
      const dateKey = item.updatedAt.split(" ")[0];

      if (lastDate === null || lastDate === dateKey) {
        currentGroup.push(item);
      } else {
        groupedData[lastDate] = currentGroup;
        currentGroup = [item];
      }

      lastDate = dateKey;
      if (index === rawData.length - 1) {
        groupedData[dateKey] = currentGroup;
      }
    });

    setResultSearchHistory(groupedData);
    console.log(groupedData);
  };
  React.useEffect(() => {
    setLoading(true);

    get(searchHistory, { pageNo: pageNoRef.current, pageSize: 20 }, true)
      .then((response) => {
        fetchData(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);
  const handleOnClickButton = (value) => {
    if (value === focus) {
      return;
    }

    if (value === 1) {
      setLoading(true);
      pageNoRef.current = 0;
      saveChangeRef.current = true;
      get(searchHistory, { pageNo: pageNoRef.current, pageSize: 20 }, true)
        .then((response) => {
          fetchData(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    } else if (value === 2) {
      saveChangeRef.current = false;
      setDay("");
      setMonth("");
      setYear("");
    } else if (value === 3) {
      saveChangeRef.current = false;
      setSelectedToDate("");
      setSelectedFromDate("");
    }
    setFocus(value);
  };
  console.log(focus);
  console.log(selectedFromDate);
  const handleDisabledSaveChange = () => {
    if (focus === 1) {
      return true;
    } else if (focus === 2) {
      if (year !== "") {
        return false;
      }
    } else if (focus === 3) {
      if (
        selectedFromDate !== "" &&
        selectedToDate !== "" &&
        selectedToDate <= selectedFromDate &&
        selectedFromDate != null &&
        selectedToDate != null &&
        selectedFromDate != undefined &&
        selectedToDate != undefined
      ) {
        return false;
      }
    }
    return true;
  };

  const formatDate = (date) => date.toISOString().split("T")[0];
  const handleOnClickButtonSaveChange = () => {
    if (focus === 2) {
      setLoading(true);
      pageNoRef.current = 0;
      saveChangeRef.current = true;
      get(
        findSearchHistoryYearMonthDay,
        { year: year, month: month, day: day },
        true
      )
        .then((response) => {
          fetchData(response);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    } else if (focus === 3) {
      pageNoRef.current = 0;
      setLoading(true);
      saveChangeRef.current = true;
      get(
        findSearchHistoryToFrom,
        {
          from: formatDate(selectedFromDate),
          to: formatDate(selectedToDate),
        },
        true
      )
        .then((response) => {
          fetchData(response);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  };
  const fetchDataScroll = (response) => {
    const rawData = response.data.data.data;

    setResultSearchHistory((prevHistory) => {
      let newGroupedData = { ...prevHistory };
      let currentGroup = [];
      let lastDate = null;

      rawData.forEach((item, index) => {
        const dateKey = item.updatedAt.split(" ")[0];

        if (lastDate === null || lastDate === dateKey) {
          currentGroup.push(item);
        } else {
          if (!newGroupedData[lastDate]) newGroupedData[lastDate] = [];
          newGroupedData[lastDate] = [
            ...newGroupedData[lastDate],
            ...currentGroup,
          ];
          currentGroup = [item];
        }

        lastDate = dateKey;
        if (index === rawData.length - 1) {
          if (!newGroupedData[dateKey]) newGroupedData[dateKey] = [];
          newGroupedData[dateKey] = [
            ...newGroupedData[dateKey],
            ...currentGroup,
          ];
        }
      });

      return newGroupedData;
    });
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (
        scrollTop + clientHeight >= scrollHeight - 10 &&
        saveChangeRef.current
      ) {
        if (loadingScroll || !hasMoreData.current) return;
        console.log("load more data");
        loadingRef.current = true;
        setLoadingScroll(true);

        let path = searchHistory;
        let params = { pageNo: pageNoRef.current + 1, pageSize: 20 };

        if (focus === 2) {
          path = findSearchHistoryYearMonthDay;
          params = { year, month, day, pageNo: pageNoRef.current + 1 };
        } else if (focus === 3) {
          path = findSearchHistoryToFrom;
          params = {
            from: formatDate(selectedFromDate),
            to: formatDate(selectedToDate),
            pageNo: pageNoRef.current + 1,
          };
        }

        get(path, params, true)
          .then((response) => {
            if (response.data.data.data.length === 0) {
              hasMoreData.current = false;
              return;
            }
            fetchDataScroll(response);
            pageNoRef.current = pageNoRef.current + 1;
          })
          .catch((error) => console.log(error))
          .finally(() => {
            loadingRef.current = false;
            setLoadingScroll(false);
          });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      hasMoreData.current = true;
      window.removeEventListener("scroll", handleScroll);
    };
  }, [focus, saveChangeRef.current]);

  const handleOnClickXmark = (item) => {
    console.log(item);
    post(deleteSearchHistory, { searchHistoryId: item.searchHistoryId }, true)
      .then((response) => {
        console.log(response);
        setResultSearchHistory((prevHistory) => {
          if (!item?.updatedAt) return prevHistory; // Kiểm tra updatedAt hợp lệ

          const dateKey = item.updatedAt.split(" ")[0];

          if (!prevHistory[dateKey]) return prevHistory; // Kiểm tra nhóm ngày có tồn tại không

          const newHistory = { ...prevHistory }; // Sao chép object để tránh mutate trực tiếp state
          newHistory[dateKey] = newHistory[dateKey].filter(
            (history) => history.searchHistoryId !== item.searchHistoryId
          );

          // Nếu sau khi xóa, nhóm ngày không còn bản ghi nào thì xóa luôn key
          if (newHistory[dateKey].length === 0) {
            delete newHistory[dateKey];
          }

          return newHistory;
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  return (
    <Body searchHistory>
      <aside className={clsx(styles.leftSideBar)}>
        <div>
          <div className={clsx(styles.hearderFilter)}>Nhật ký hoạt động</div>
          <hr />
        </div>

        <div>
          <div className={clsx(styles.bodyFilter)}>Bộ lọc</div>
          <ul className={clsx(styles.listFilter)}>
            <li className={clsx(styles.itemFilter)}>
              <Button
                icon
                buttonFilter
                buttonFilterFocus={1 === focus}
                onClick={() => handleOnClickButton(1)}
              >
                <Button iconFilter icon buttonFilterFocus={1 === focus}>
                  <FontAwesomeIcon icon={faBars} />
                </Button>
                Tất cả
              </Button>
            </li>
            <li className={clsx(styles.itemFilter)}>
              <Button
                icon
                buttonFilter
                buttonFilterFocus={2 === focus}
                onClick={() => handleOnClickButton(2)}
              >
                <Button iconFilter icon buttonFilterFocus={2 === focus}>
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </Button>
                Ngày
              </Button>
              {2 === focus && (
                <div className={clsx(styles.dayWapper)}>
                  <div className={clsx(styles.dayWapperItem)}>
                    <div>Năm</div>
                    <Select
                      placeholder="Chọn năm"
                      options={Array.from(
                        { length: 100 },
                        (_, i) => i + 2021
                      ).map((item) => ({ value: item, label: item }))}
                      value={{ value: year, label: year }}
                      onChange={(e) => setYear(e.value)}
                      styles={customStyles}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                    />
                  </div>
                  {year !== "" && (
                    <div className={clsx(styles.dayWapperItem)}>
                      <div>Tháng</div>
                      <Select
                        placeholder="Chọn tháng"
                        options={Array.from(
                          { length: 12 },
                          (_, i) => i + 1
                        ).map((item) => {
                          if (item < 10) {
                            item = "0" + item;
                          }
                          return { value: item, label: item };
                        })}
                        value={{ value: month, label: month }}
                        onChange={(e) => {
                          setMonth(e.value);
                          saveChangeRef.current = false;
                        }}
                        styles={customStyles}
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }}
                      />
                    </div>
                  )}
                  {month !== "" && (
                    <div className={clsx(styles.dayWapperItem)}>
                      <div>Ngày</div>
                      <Select
                        placeholder="Chọn ngày"
                        options={Array.from(
                          { length: 31 },
                          (_, i) => i + 1
                        ).map((item) => {
                          if (item < 10) {
                            item = "0" + item;
                          }
                          return { value: item, label: item };
                        })}
                        value={{ value: day, label: day }}
                        onChange={(e) => {
                          setDay(e.value);
                          saveChangeRef.current = false;
                        }}
                        styles={customStyles}
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </li>
            <li className={clsx(styles.itemFilter)}>
              <Button
                icon
                buttonFilter
                buttonFilterFocus={3 === focus}
                onClick={() => handleOnClickButton(3)}
              >
                <Button iconFilter icon buttonFilterFocus={3 === focus}>
                  <FontAwesomeIcon icon={faCalendar} />
                </Button>
                Tùy chọn
              </Button>
              {3 === focus && (
                <div className={clsx(styles.optionFilter)}>
                  <div>Từ</div>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={vi}
                  >
                    <DatePicker
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "40px", // Điều chỉnh chiều cao mong muốn
                          fontSize: "0.875rem",

                          minWidth: "195px", // Chiều rộng cố định
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "orange", // Khi hover
                        },
                      }}
                      dateFormats={"dd/MM/yyyy"}
                      value={selectedToDate}
                      onChange={(newValue) => {
                        setSelectedToDate(newValue);
                        saveChangeRef.current = false;
                      }}
                      dayOfWeekFormatter={(day) => {
                        let dayLabel = format(day, "eee", { locale: vi });

                        if (dayLabel.toLowerCase().includes("chủ")) {
                          return "CN";
                        }

                        dayLabel = dayLabel.replace(/(Thứ\s*)/i, "T").trim();
                        return dayLabel;
                      }}
                    />
                  </LocalizationProvider>
                  <div>Đến</div>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={vi}
                  >
                    <DatePicker
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "40px", // Điều chỉnh chiều cao mong muốn
                          fontSize: "0.875rem",
                          minWidth: "195px",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "orange", // Khi hover
                        },
                      }}
                      format="dd/MM/yyyy"
                      value={selectedFromDate}
                      onChange={(newValue) => {
              
                        setSelectedFromDate(newValue);
                        saveChangeRef.current = false;
                      }}
                      dayOfWeekFormatter={(day) => {
                        let dayLabel = format(day, "eee", { locale: vi });

                        if (dayLabel.toLowerCase().includes("chủ")) {
                          return "CN";
                        }

                        dayLabel = dayLabel.replace(/(Thứ\s*)/i, "T").trim();
                        return dayLabel;
                      }}
                    />
                  </LocalizationProvider>
                </div>
              )}
            </li>
          </ul>
        </div>
        <div className={clsx(styles.buttonSaveChange)}>
          <Button
            icon
            saveChange
            disabled={handleDisabledSaveChange()}
            onClick={handleOnClickButtonSaveChange}
          >
            Lưu thay đổi
          </Button>
        </div>
      </aside>

      <div className={clsx(styles.main)}>
        <div className={clsx(styles.content)}>
          {loading ? (
            <LoaderPeople />
          ) : (
            <div>
              <div className={clsx(styles.hearderWapper)}>
                <div className={clsx(styles.hearderFilter)}>
                  Kết quả tìm kiếm
                </div>
                <button
                  className={clsx(styles.buttonDelete)}
                  onClick={() => setShowModal(true)}
                >
                  Xóa lịch sử
                </button>
                {showModal && (
                  <Modal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    handleOnClickYes={handleOnClickYes}
                  />
                )}
              </div>
              <div ref={scrollContainerRef}>
                {Object.entries(resultSearchHistory).map(
                  ([dateKey, items], groupIndex) => {
                    const [yearResult, monthResult, dayResult] = dateKey
                      .split("-")
                      .map((part) => parseInt(part, 10)); // Chuyển đổi thành số nguyên để loại bỏ số 0
                    return (
                      <div key={groupIndex} className={clsx(styles.itemWapper)}>
                        <div>
                          <span className={clsx(styles.dayMonthYear)}>
                            {dayResult}
                          </span>
                          <span className={clsx(styles.dayMonthYear)}>
                            Tháng {monthResult},
                          </span>
                          <span className={clsx(styles.dayMonthYear)}>
                            {yearResult}
                          </span>
                        </div>
                        <div>
                          {items.map((item, index) => {
                            const time = item.updatedAt
                              .split(" ")[1]
                              .substring(0, 5); // Lấy thời gian (giờ:phút)
                            return (
                              <div key={index} className={clsx(styles.item1)}>
                                <span className={clsx(styles.item)}>
                                  <span>
                                    <img
                                      src={item.avatar}
                                      alt="avatar"
                                      className={clsx(styles.avatar)}
                                    />
                                    <span>{item.textSearch}</span>
                                  </span>
                                  <span>{time}</span>
                                </span>
                                <Button
                                  icon
                                  onClick={() => handleOnClickXmark(item)}
                                >
                                  <FontAwesomeIcon icon={faXmark} />
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                )}
                {loadingScroll && <LoaderPeople />}
              </div>
            </div>
          )}
        </div>
      </div>
    </Body>
  );
}

export default SearchHistory;
