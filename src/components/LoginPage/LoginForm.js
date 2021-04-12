import React, { Component } from "react";
import { Panel, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const divStyle = {
  display: "flex",
  alignItems: "center",
  marginTop: -100,
};

const panelStyle = {
  backgroundColor: "rgba(255,255,255,0.5)",
  border: 0,
  paddingLeft: 20,
  paddingRight: 20,
  width: 300,
};

const buttonStyle = {
  marginBottom: 0,
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
    };
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //password
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["password"] = "Only letters";
      }
    }

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();

    if (this.handleValidation()) {
      alert("Form submitted");
    } else {
      alert("Form has errors.");
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <div style={divStyle}>
        <Panel style={panelStyle}>
          <Form
            horizontal
            className="LoginForm"
            id="loginForm"
            onSubmit={this.contactSubmit.bind(this)}
          >
            <FormGroup controlId="formEmail">
              <FormControl
                type="email"
                placeholder="Email Address"
                onChange={this.handleChange.bind(this, "email")}
                value={this.state.fields["email"]}
              />
              <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
            </FormGroup>
            <FormGroup controlId="formPassword">
              <FormControl
                type="password"
                placeholder="Password"
                onChange={this.handleChange.bind(this, "password")}
                value={this.state.fields["password"]}
              />
              <span style={{color: "red"}}>{this.state.errors["password"]}</span>
            </FormGroup>
            <FormGroup style={buttonStyle} controlId="formSubmit">
              <Button
                bsStyle="primary"
                type="submit"
                onClick={this.handleFormSubmit}
              >
                Login
              </Button>
              <Link to="/Register">Register</Link>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    );
  }
}

export default LoginForm;
