import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../App";
import ViewFile from "./ViewFile";
import img from "../images/NoRecordFound.png";
function CreateFile() {
  // Make useRef for Input Forms
  const titleRef = useRef();
  const contentRef = useRef();
  // Make a divRef for Handling first focus on input box
  const divRef = useRef();
  // Message State For Showing Alerts
  const [message, setMessage] = useState("");
  // UseContext
  const file = useContext(DataContext);
  // This useEffect does foucs on input box and store localStorage data into Context State
  useEffect(() => {
    divRef.current.addEventListener("shown.bs.modal", function () {
      titleRef.current.focus();
    });
    if (JSON.parse(localStorage.getItem("data")) !== null) {
      file.setData(JSON.parse(localStorage.getItem("data")));
    }
  }, []);
  // Save Handler Function
  const saveHandler = () => {
    // Make a temp local array that will holds data and set into localStorage
    let temp = [];
    // Check Validation
    if (titleRef.current.value === "") {
      setMessage("Title Field Can Not Be Empty !");
      titleRef.current.focus();
    } else if (contentRef.current.value === "") {
      setMessage("Content Field Can Not Be Empty !");
      contentRef.current.focus();
    } else {
      setMessage("New File Added Successfully");
      // Make a object
      let obj = {
        id: Math.floor(Math.random() * 1000),
        title: titleRef.current.value,
        content: contentRef.current.value,
      };
      // Push into Context data as well as localStorage
      if (JSON.parse(localStorage.getItem("data")) !== null) {
        temp = JSON.parse(localStorage.getItem("data"));
      }
      temp.push(obj);
      localStorage.setItem("data", JSON.stringify(temp));
      file.setData(JSON.parse(localStorage.getItem("data")));
      // Clear Input Fields
      titleRef.current.value = "";
      contentRef.current.value = "";
    }
  };
  return (
    <div>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={() => setMessage("")}
      >
        Add a Document
      </button>
      <br></br>
      <div
        ref={divRef}
        className="modal fade"
        data-bs-backdrop="static"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New File
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <input
                  ref={titleRef}
                  type="text"
                  className="form-control"
                  placeholder="Title..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  Title
                </span>
              </div>
              <div className="form-floating">
                <textarea
                  ref={contentRef}
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: "200px" }}
                ></textarea>
                <label htmlFor="floatingTextarea2">Content</label>
              </div>
              <br></br>
              {message === "Title Field Can Not Be Empty !" ||
              message === "Content Field Can Not Be Empty !" ? (
                <div
                  class="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  {message}
                  <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                    onClick={() => setMessage("")}
                  ></button>
                </div>
              ) : message === "New File Added Successfully" ? (
                <div
                  class="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  {message}
                  <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                    onClick={() => setMessage("")}
                  ></button>
                </div>
              ) : null}
            </div>
            <div className="modal-footer">
              <button
                onClick={saveHandler}
                type="button"
                className="btn btn-success"
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      {/* Call ViewFile Component */}
      <center>
        <div className="displayFiles">
          {file.data.length !== 0 ? (
            file.data.map((val, index) => (
              <>
                <ViewFile
                  id={val.id}
                  title={val.title}
                  content={val.content}
                  index={index}
                />
              </>
            ))
          ) : (
            <img
              style={{ width: "80%", marginLeft: "5em" }}
              src={img}
              alt="no data"
            />
          )}
        </div>
      </center>
    </div>
  );
}

export default CreateFile;
