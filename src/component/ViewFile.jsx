import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../App";

function ViewFile(props) {
  // UseContext
  const file = useContext(DataContext);
  // useRef For Input Fields
  const titleRef = useRef();
  const contentRef = useRef();
  // Message State For Showing Alerts
  const [message, setMessage] = useState("");
  // This useEffect Will Render Updated value Of Input Forms
  useEffect(() => {
    titleRef.current.value = props.title;
    contentRef.current.value = props.content;
  }, [file, props.content, props.title]);
  // Edit Handler Function
  const editHandler = (e) => {
    e.preventDefault();
    for (let i = 0; i < file.data.length; i++) {
      if (file.data[i].id === props.id) {
        // Check Validation
        if (titleRef.current.value === "") {
          setMessage("Title Field Can Not Be Empty !");
          titleRef.current.focus();
        } else if (contentRef.current.value === "") {
          setMessage("Comment Field Can Not Be Empty !");
          contentRef.current.focus();
        } else {
          setMessage("Edit File Successfully");
          // Maka a object
          let obj = {
            id: Math.floor(Math.random() * 1000),
            title: titleRef.current.value,
            content: contentRef.current.value,
          };
          // Replace object into context data state
          file.data.splice(props.index, 1, obj);
          file.setData([...file.data]);
          // Also Set Into LocalStorage
          localStorage.setItem("data", JSON.stringify(file.data));
        }
      }
    }
  };
  // Delete Handler Function
  const deleteHandler = (e) => {
    e.preventDefault();
    for (let i = 0; i < file.data.length; i++) {
      if (file.data[i].id === props.id) {
        file.data.splice(i, 1);
      }
    }
    file.setData([...file.data]);
    localStorage.setItem("data", JSON.stringify(file.data));
  };
  return (
    <div className="viewFile">
      <button
        style={{ padding: "10px 20px", width: "200px" }}
        type="button"
        class="btn btn-light"
        data-bs-toggle="modal"
        data-bs-target={`#exampleModal${props.id}`}
        onClick={() => setMessage("")}
      >
        <i style={{ color: "#4285f4" }} class="fas fa-file-alt"></i>&nbsp;{" "}
        {props.title}
      </button>
      <div
        class="modal fade"
        id={`exampleModal${props.id}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title" id="exampleModalLabel">
                {props.title}
              </h3>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="input-group mb-3">
                <input
                  ref={titleRef}
                  defaultValue={props.title}
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
                  defaultValue={props.content}
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: "200px" }}
                ></textarea>
                <label htmlFor="floatingTextarea2">Content</label>
              </div>
              <br></br>
              {message === "Title Field Can Not Be Empty !" ||
              message === "Comment Field Can Not Be Empty !" ? (
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
              ) : message === "Edit File Successfully" ? (
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
            <div class="modal-footer">
              <button
                onClick={editHandler}
                type="button"
                class="btn btn-warning"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      &nbsp;
      <i
        confirm="Are your sure?"
        onClick={deleteHandler}
        class="material-icons"
        style={{ color: "red", float: "right" }}
      >
        delete
      </i>
    </div>
  );
}

export default ViewFile;
