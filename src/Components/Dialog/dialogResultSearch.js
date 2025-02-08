import React from "react";
import { get, post } from "~/services/callApi";
import {
  searchPeople,
  searchHistory,
  addSearchHistory,
  deleteSearchHistory,
  updateSearchHistory,
} from "~/services/apiEndpoint";
import clsx from "clsx";
import logo from "~/assets/images/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./dialog.module.css";
import Button from "~/Components/Button";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DialogResultSearch({ showDialog, setShowDialog }) {
  const getStatusText = (status) => {
    switch (status) {
      case "FRIEND":
        return "Bạn bè";
      case "SENT":
        return "Chờ xác nhận";
      case "RECEIVED":
        return "Yêu cầu kết bạn";
      case "NOT_FRIEND":
        return "Mọi người";
      default:
        return "trạng thái không xác định";
    }
  };
  const location = useLocation();
  const navigate=useNavigate();
  const dialogResultSearchRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [loadingSearchHistory, setLoadingSearchHistory] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [showIconXSearch, setShowIconXSearch] = React.useState(false);
  const [resultSearch, setResultSearch] = React.useState([]);
  const [resultSearchHistory, setResultSearchHistory] = React.useState([]);
  const [refreshSearchHistory, setRefreshSearchHistory] = React.useState(false);
  const [refreshBeforeDelete, setRefreshBeforeDelete] = React.useState(false);
  const [isPathSearchHistory, setIsPathSearchHistory] = React.useState(false);
  React.useEffect(() => {
    const isSearchHistory = location.pathname.includes("search-history");
    setIsPathSearchHistory(isSearchHistory);
  }, [location]);
  const handleOnPressEnter = (e) => {
    if (e.key === "Enter" && search !== "") {
      post(addSearchHistory, { textSearch: search }, true)
        .then((res) => {
          console.log(res);
          navigate(`/search?q=${search}`);

        })
        .finally(() => {
          setShowDialog(0);
        setDisabled(false);
        setShowIconXSearch(false);
          setRefreshSearchHistory(false);
          setSearch("");
        });
    }
  };
  const handleOnClickButtonSearch = () => {
    if (search !== "") {
      post(addSearchHistory, { textSearch: search }, true)
        .then((res) => {
          console.log(res);
          
          navigate(`/search?q=${search}`);
        })
        .finally(() => {
          setShowDialog(0);
        setDisabled(false);
        setShowIconXSearch(false);
          setRefreshSearchHistory(false);
          setSearch("");
        });
    }
  };
  const handleOnClickXSearch = () => {
    setSearch("");
    setResultSearch([]);
    setShowIconXSearch(false);
  };
  const handleOnChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 0) {
      setShowIconXSearch(true);
    } else {
      setShowIconXSearch(false);
    }
  };
  const handleOnClickInputSearch = () => {
    setShowDialog(4);
    setDisabled(true);
    if ((!refreshSearchHistory && search === "") || refreshBeforeDelete ||isPathSearchHistory) {
      setLoadingSearchHistory(true);
      get(searchHistory, {}, true)
        .then((response) => {
          setResultSearchHistory(response.data.data.data);
          console.log(response.data.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          
          setLoadingSearchHistory(false);
        });
      setRefreshBeforeDelete(false);
      setRefreshSearchHistory(true);
    }
  };
  const handelOnClickResultItem = (fullName, userId) => {
    post(
      addSearchHistory,
      { historyUserId: userId, textSearch: fullName },
      true
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setShowDialog(0);
        setDisabled(false);
        setShowIconXSearch(false);
        setRefreshSearchHistory(false);
        setSearch("");
      });
  };
  const handelOnClickResultItemHistory = (item) => {
    post(
      updateSearchHistory,
      { searchHistoryId: item.searchHistoryId },
      true
    )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setShowDialog(0);
        setDisabled(false);
        setShowIconXSearch(false);
        setRefreshSearchHistory(false);
        setSearch("");
      });
  };
  const handelOnClickButtonXSearhHistory = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    post(
      deleteSearchHistory,
      { searchHistoryId: item.searchHistoryId },
      true
    )
      .then((response) => {
        console.log(response);
        setResultSearchHistory(
          resultSearchHistory.filter(
            (x) => x.searchHistoryId !== item.searchHistoryId
          )
        );
        setRefreshBeforeDelete(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };
  React.useEffect(() => {
    if (search === "") {
      setLoading(false);
      setResultSearch([]);
      return;
    }

    const apiResults = () => {
      get(searchPeople, { keyword: search }, true)
        .then((response) => {
          console.log(response.data.data.data);
          setResultSearch(response.data.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (showDialog === 4) {
      setLoading(true);
      const timer = setTimeout(apiResults, 1000); // Debounce API call
      return () => {
        clearTimeout(timer);
      };
    }
  }, [search]);
  React.useEffect(() => {
    const handleOnClickOutSide = (e) => {
      if (
        dialogResultSearchRef.current &&
        !dialogResultSearchRef.current.contains(e.target) &&
        showDialog === 4
      ) {
        setShowDialog(0);
        setDisabled(false);
      }
    };
    if (showDialog === 4)
      document.addEventListener("click", handleOnClickOutSide);
    return () => {
      document.removeEventListener("click", handleOnClickOutSide);
    };
  }, [dialogResultSearchRef, showDialog]);
  return (
    <div
      role="dialog"
      ref={dialogResultSearchRef}
      className={clsx(styles.dialog, styles.dialogResultSearch, {
        [styles.showDialog]: showDialog === 4,
      })}
    >
      <div className={clsx(styles.logoWrapper)}>
        <Link to="/">
          <Button logo>
            <img src={logo} alt="logo" />
          </Button>
        </Link>
        <div className={clsx(styles.searchWrapper)}>
          <div className={clsx(styles.searchIcon)}>
            <Button iconSearch onClick={handleOnClickButtonSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </div>
          <input
            type="search"
            className={clsx(styles.search)}
            placeholder="Tìm kiếm"
            onClick={handleOnClickInputSearch}
            value={search}
            onChange={handleOnChange}
            onKeyDown={handleOnPressEnter}
          />
          {showIconXSearch && (
            <div className={clsx(styles.xSearch)}>
              <Button iconXSearch onClick={handleOnClickXSearch}>
                <FontAwesomeIcon icon={faXmark} />
              </Button>
            </div>
          )}
        </div>
      </div>
      {disabled && (
        <div>
          {loading || loadingSearchHistory ? (
            <div className={clsx(styles.spinnerContainer)}>
              <div className={clsx(styles.spinner)}></div>{" "}
              {/* Spinner tự tạo bằng CSS */}
            </div>
          ) : search.trim() !== " " && resultSearch.length !== 0 ? (
            <ul className={clsx(styles.resultSearchList)}>
              {resultSearch.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`/search?q=${item.fullName}`}
                    onClick={() =>
                      handelOnClickResultItem(item.fullName, item.userId)
                    }
                    className={clsx(styles.resultSearchLink)}
                  >
                    <div className={clsx(styles.resultSearchItem)}>
                      <img
                        src={item.avatar}
                        alt="avatar"
                        className={clsx(styles.avatar)}
                      />
                      <div>
                        <div>{item.fullName}</div>
                        <div className={clsx(styles.status)}>
                          {getStatusText(item.status)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : search.trim() === "" && resultSearchHistory.length !== 0 ? (
            <div>
              <div className={clsx(styles.hearderHistoryWrapper)}>
                <div className={clsx(styles.textSearchRecently)}>Gần đây</div>
                <Link to="/search-history"
                onClick={()=>{
                  setShowDialog(0);
                  setDisabled(false);
                }}
                >
                  <button className={clsx(styles.buttonChangeHistory)}>
                    Chỉnh sửa
                  </button>
                </Link>
              </div>
              <ul className={clsx(styles.resultSearchList)}>
                {resultSearchHistory.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={`/search?q=${item.textSearch}`}
                      onClick={() => handelOnClickResultItemHistory(item)}
                      className={clsx(styles.resultSearchLink)}
                    >
                      <div className={clsx(styles.resultSearchItem)}>
                        <img
                          src={item.avatar}
                          alt="avatar"
                          className={clsx(styles.avatar)}
                        />

                        <div>{item.textSearch}</div>
                        <Button
                          icon
                          iconXHistorySearch
                          onClick={(e) =>
                            handelOnClickButtonXSearhHistory(e, item)
                          }
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </Button>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={clsx(styles.noResult)}>
              Không có kết quả tìm kiếm
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DialogResultSearch;
