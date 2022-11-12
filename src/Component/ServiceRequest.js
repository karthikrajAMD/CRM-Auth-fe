import React, { useContext } from "react";
import SidebarDashboard from "../Bars/SidebarDashboard";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Context } from "../Context";
function ServiceRequest() {
  const [sideShow, setSideShow] = useContext(Context);
  let name = "Service Request";
  return (
    <>
      <main className={sideShow ? "space-toggle" : null}>
        <SidebarDashboard name={name} />
        <div className="service-request">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Name<sup>*</sup>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                onChange={(e) => {}}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                Email address<sup>*</sup>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => {}}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>
                Mobile<sup>*</sup>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Mobile"
                onChange={(e) => {}}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Issue Type</Form.Label>
              <Form.Select onChange={(e) => {}}>
                {/* {issueTypes.map((e, i) => {
                  return (
                    <option value={e} key={i}>
                      {e}
                    </option>
                  );
                })} */}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Issue Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                onChange={(e) => {}}
              />
            </Form.Group>

            <FloatingLabel controlId="floatingTextarea2" label="Description">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                onChange={(e) => {}}
              />
            </FloatingLabel>

            <div className="mt-3" style={{ textAlign: "center" }}>
              <Button variant="primary" onClick={() => {}}>
                Submit
              </Button>
            </div>
            <div style={{ textAlign: "center" }}>
              <Form.Text className="text-muted">
                <sup>*</sup>We'll never share your Personal Information with
                anyone else.
              </Form.Text>
            </div>
          </Form>
        </div>
      </main>
    </>
  );
}

export default ServiceRequest;
