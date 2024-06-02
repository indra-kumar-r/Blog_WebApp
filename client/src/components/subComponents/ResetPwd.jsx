import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../UserContext";

const ResetPwd = () => {
  let [newPwd, setNewPwd] = useState("");
  let [confirmPwd, setConfirmPwd] = useState("");
  let { userInfo } = useContext(UserContext);

  const changePassword = async () => {
    if (!newPwd.trim() || !confirmPwd.trim()) {
      return toast.error("Please fill both the fields.");
    }
    if (newPwd.trim() !== confirmPwd.trim()) {
      return toast.error(
        "The passwords do not match. Please re-enter your new password."
      );
    }

    try {
      let response = await fetch(`http://localhost:9000/resetpassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userInfo.username, password: newPwd }),
      });
      if (response.ok) {
        toast.success("Your password has been reset successfully.");
        setNewPwd("");
        setConfirmPwd("");
      }
    } catch (error) {
      toast.error("Failed");
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="resetPassword"
        tabIndex="-1"
        aria-labelledby="resetPasswordLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content m-0 p-0 pb-2">
            <div className="d-flex justify-content-between align-items-center">
              <h1
                className="fs-5 text-danger text-uppercase fw-bold ps-4 m-0"
                id="resetPasswordLabel"
              >
                Reset Password <i className="bi bi-tools"></i>
              </h1>
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ outline: "none", border: "none" }}
              >
                <i className="bi bi-x-circle fs-5" style={{ color: "red" }}></i>
              </button>
            </div>
            <div className="modal-body m-2 ps-5 pe-5 pt-3 pb-3">
              <div className="customRow d-flex gap-2">
                <div
                  className="customColumn d-flex justify-content-center align-items-center"
                  style={{ width: "25%" }}
                >
                  <img
                    src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?size=338&ext=jpg&ga=GA1.1.672697106.1717286400&semt=ais_user"
                    className="img-fluid"
                  />
                </div>
                <div className="customColumn" style={{ width: "75%" }}>
                  <input
                    type="password"
                    className="form-control py-2"
                    placeholder="Enter your new password"
                    style={{ outline: "none", boxShadow: "none" }}
                    required
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                  />
                  <input
                    type="password"
                    className="form-control my-3 py-2"
                    placeholder="Confirm your new password"
                    style={{ outline: "none", boxShadow: "none" }}
                    required
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-warning text-light fs-6 fw-bold mt-2"
                  onClick={changePassword}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPwd;
