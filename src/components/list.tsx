import { useEffect, useState } from "react";
import { Loader } from "./loader";

const getTableContent = (data: any, setPopup: any, setPopupData: any) => {
  const onClickViewDetails = (id: any) => {
    setPopup(true);
    let filterData = data.data.filter((item: any) => item.id == id);
    setPopupData(filterData.length ? filterData[0] : "");
  };

  const iterateItem = (item: any[]) => {
    return item.map(function ({ id, attributes: { name, icon } }) {
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>
            <img width={50} src={icon} alt={name} />
          </td>
          <td>
            <button onClick={() => onClickViewDetails(id)}>Details</button>
          </td>
        </tr>
      );
    });
  };
  return (
    <table>
      <thead>
        <td>{"Name"}</td> <td>Image</td> <td>More details</td>
      </thead>
      <tbody>{data && iterateItem(data.data)}</tbody>
    </table>
  );
};

export const ListOfItems = () => {
  const [sports, setSports] = useState();
  const [popup, setPopup] = useState(false);
  const [popupData, setPopupData] = useState();

  const [error,setError] = useState('');
  useEffect(() => {
    fetch("https://sports.api.decathlon.com/sports")
      .then((response) => {
        if (response.ok) {
            return response.json();
          } else {
            setError('Something went wrong');
          }
      })
      .then((data) => {
        setSports(data);
      })
     .catch((error) => {
        setError(error);
      });

  }, []);

  const getId = (idData: any) => {
    return idData.id;
  };
  const getType = (idData: any) => {
    return idData.type;
  };
  const getTypeIcon = (idData: any) => {
    return idData.attributes.icon;
  };
  const getDesc = (idData: any) => {
    return idData.attributes.description;
  };

  return (
    <div>
      <h1> Sports List</h1>
      <div>
        {sports ? getTableContent(sports, setPopup, setPopupData) : <Loader />}
      </div>
      <div>{error ? error : ''}</div>
      <div
        className="popup"
        popup-name="popup-1"
        style={{ display: popup ? "block" : "none" }}
      >
        <div className="popup-content">
          <h2>Sport Details </h2>
          {sports && popupData ? (
            <>
              <p>ID:{getId(popupData)}</p>
              <div style={{ display: "grid" }}>
                <span> Type: {getType(popupData)}</span>{" "}
                <span>
                  {" "}
                  <img src={getTypeIcon(popupData)} width="50" alt="" />
                </span>
              </div>
              <p>Description : {getDesc(popupData)}</p>
            </>
          ) : (
            ""
          )}
          <a
            className="close-button"
            popup-close="popup-1"
            onClick={() => setPopup(false)}
          >
            x
          </a>
        </div>
      </div>
    </div>
  );
};
