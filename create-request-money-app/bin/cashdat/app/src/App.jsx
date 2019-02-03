/* eslint-disable no-restricted-globals */
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import {
  TextField,
  Button,
  Snackbar,
  IconButton,
  Theme,
  withStyles,
  WithStyles,
  LinearProgress
} from "@material-ui/core";
import axios from "axios";
import io from "socket.io-client";
import CloseIcon from "@material-ui/icons/Close";
import ReactJson from "react-json-view";
import path from "path";

const openTab = require("open-new-tab");

/**
 * @param theme {Theme}
 */
const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    const socket = io(location.protocol + "//" + location.host);
    socket.on("notifications", data => {
      this.setState({ loading: false, result: JSON.parse(data.data) });
    });
  }

  state = {
    amount: 100,
    contactName: "John",
    email: "john@beta.inter.ac",
    memo: "Money is good. :)",
    open: false,
    paymentGatewayUrl: "",
    loading: false,
    result: {}
  };

  /**
   * @param name {string}
   */
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className="App">
          {this.state.loading && <LinearProgress />}
          <form
            onSubmit={async e => {
              e.preventDefault();
              const baseURL =
                process.env.NODE_ENV === "production" ? "" : "/api";
              const result = await axios.post(`${baseURL}v1/request-money`, {
                amount: this.state.amount,
                contactName: this.state.contactName,
                email: this.state.email,
                memo: this.state.memo
              });

              const { paymentGatewayUrl } = result.data;

              openTab(paymentGatewayUrl);

              this.setState({ paymentGatewayUrl, open: true, loading: true });
            }}
          >
            <TextField
              id="standard-name"
              label="Name"
              value={this.state.amount}
              onChange={this.handleChange("amount")}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Name"
              value={this.state.contactName}
              onChange={this.handleChange("contactName")}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Name"
              value={this.state.email}
              onChange={this.handleChange("email")}
              margin="normal"
            />
            <TextField
              id="standard-name"
              label="Name"
              value={this.state.memo}
              onChange={this.handleChange("memo")}
              margin="normal"
            />
            <div>
              <Button type="submit" variant="contained">
                Send Money Request
              </Button>
            </div>
          </form>
        </div>
        <ReactJson src={this.state.result} theme="solarized" />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={<span id="message-id">{this.state.paymentGatewayUrl}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </React.Fragment>
    );
  }
}

const HomePage = withStyles(styles)(Home);

const ThanksForDonating = () => (
  <h2>Thanks for donating to our charitable cause!</h2>
);

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={HomePage} />
      <Route path="/thanks/" component={ThanksForDonating} />
    </div>
  </Router>
);

export default AppRouter;
