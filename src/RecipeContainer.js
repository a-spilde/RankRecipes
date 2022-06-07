import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Recipe from "./Recipe";

class RecipeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      addName: "-1",
      addCategory: "-1",
      addRating: 0,
      addSauceRating: "N/A",
      addCost: "-1",
      addSource: "-1",
      addNotes: "-1",
    };
  }

  showRecipes() {
    let r = [];

    for (let i = 0; i < this.props.recipes.length; i++) {
      r.push(
        <Recipe
          name={this.props.recipes[i].Name}
          category={this.props.recipes[i].Category}
          cost={this.props.recipes[i].Cost}
          score={this.props.recipes[i].Rating}
          sauceRank={this.props.recipes[i].SauceRating}
          note={this.props.recipes[i].Notes}
          source={this.props.recipes[i].Source}
          id={this.props.recipes[i].i}
          // id={this.props.recipes[i].id}
          delete={(data) => this.callDelete(data)}
          edit={(data) => this.callEdit(data)}
        />
      );
    }

    return r;
  }

  showButton() {
    return <div className="d-grid gap-2"></div>;
  }

  closeModal() {
    this.setState({ show: false });
  }

  closeSaveModal() {
    if (
      this.state.addName === "-1" ||
      this.state.addCategory === "-1" ||
      this.state.addRating === -1 ||
      this.state.addCost === "-1"
    ) {
      console.log("NEED MORE INFO");
    } else {
      let toAdd = [];

      toAdd.push(
        this.state.addName,
        this.state.addCategory,
        this.state.addRating,
        this.state.addSauceRating,
        this.state.addCost,
        this.state.addSource,
        this.state.addNotes
      );

      this.props.add(toAdd);
      this.setState({ show: false });
    }
  }

  showModal() {
    this.setState({ show: true });
  }

  callDelete(rid) {
    console.log("RID11: " + rid);
    this.props.delete(rid);
  }

  callEdit(data) {
    this.props.edit(data);
  }

  topButton() {
    if (this.props.recipes.length > 0) {
      return (
        <Button
          id="add_button"
          variant="outline-success"
          onClick={() => this.showModal()}
        >
          Add Recipe
        </Button>
      );
    }
  }

  bottomButton() {
    if (localStorage.getItem("email")) {
      return (
        <Button
          id="add_button2"
          variant="outline-success"
          onClick={() => this.showModal()}
        >
          Add Recipe
        </Button>
      );
    }
  }

  render() {
    return (
      <div style={{ margin: 5, marginTop: -5 }}>
        {this.topButton()}
        {this.showRecipes()} {this.showButton()}
        {this.bottomButton()}
        <Modal show={this.state.show} onHide={() => this.closeModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Add Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row id="input_row">
              Name *
              <input
                type="text"
                id="addInput"
                onChange={(e) => {
                  this.setState({ addName: e.target.value });
                }}
              />
            </Row>
            <Row id="input_row">
              Category *
              <input
                type="text"
                id="addInput"
                onChange={(e) => {
                  this.setState({ addCategory: e.target.value });
                }}
              />
            </Row>

            <Row id="input_row">
              <p id="modal_label">
                Rating <span id="red_star">*</span>{" "}
              </p>
              <Row id="center_rating">{this.state.addRating}</Row>
              <input
                type="range"
                list="tickmarks"
                step="0.1"
                min="0"
                max="10"
                class="slider"
                value={this.state.addRating}
                onChange={(e) => {
                  this.setState({ addRating: e.target.value });
                }}
              />
              <datalist id="tickmarks">
                <option value="0" label="0"></option>
                <option value="10" label="0"></option>
                <option value="20" label="0"></option>
                <option value="30" label="0"></option>
                <option value="40" label="0"></option>
                <option value="50" label="0"></option>
                <option value="60" label="0"></option>
                <option value="70" label="0"></option>
                <option value="80" label="0"></option>
                <option value="90" label="0"></option>
                <option value="100" label="0"></option>
              </datalist>
            </Row>

            {/* <Row id="input_row">
              Sauce Rating
              <input
                type="decimal"
                id="addInput"
                onChange={(e) => {
                  this.setState({ addSauceRating: e.target.value });
                }}
              />
            </Row> */}

            <Row id="input_row">
              Sauce Rating
              <Row id="center_rating">{this.state.addSauceRating}</Row>
              <input
                type="range"
                list="tickmarks"
                step="0.1"
                min="0"
                max="10"
                class="slider"
                value={this.state.addSauceRating}
                onChange={(e) => {
                  this.setState({ addSauceRating: e.target.value });
                }}
              />
              <datalist id="tickmarks">
                <option value="0" label="0"></option>
                <option value="10" label="0"></option>
                <option value="20" label="0"></option>
                <option value="30" label="0"></option>
                <option value="40" label="0"></option>
                <option value="50" label="0"></option>
                <option value="60" label="0"></option>
                <option value="70" label="0"></option>
                <option value="80" label="0"></option>
                <option value="90" label="0"></option>
                <option value="100" label="0"></option>
              </datalist>
            </Row>

            <Row id="input_row">
            <p id="modal_label">
              Cost <span id="red_star">*</span>{" "}
            </p>

            <div id="costChoice">
              <input
                type="radio"
                id="contactChoice1"
                name="contact"
                value="email"
                onClick={() => {
                  this.setState({ addCost: "$" });
                }}
              />
              <label htmlFor="contactChoice1">$</label>

              <input
                type="radio"
                id="contactChoice2"
                name="contact"
                value="phone"
                onClick={() => {
                  this.setState({ addCost: "$$" });
                }}
              />
              <label htmlFor="contactChoice2">$$</label>

              <input
                type="radio"
                id="contactChoice3"
                name="contact"
                value="mail"
                onClick={() => {
                  this.setState({ addCost: "$$$" });
                }}
              />
              <label htmlFor="contactChoice3">$$$</label>
              <input
                type="radio"
                id="contactChoice4"
                name="contact"
                value="mail"
                onClick={() => {
                  this.setState({ addCost: "$$$$" });
                }}
              />
              <label htmlFor="contactChoice3">$$$$</label>
              <input
                type="radio"
                id="contactChoice5"
                name="contact"
                value="mail"
                onClick={() => {
                  this.setState({ addCost: "$$$$$" });
                }}
              />
              <label htmlFor="contactChoice3">$$$$$</label>
            </div>
          </Row>

            <Row id="input_row">
              Source
              <input
                type="text"
                id="addInput"
                onChange={(e) => {
                  this.setState({ addSource: e.target.value });
                }}
              />
            </Row>
            <Row id="input_row">
              Notes
              <textarea
                rows="5"
                onChange={(e) => {
                  this.setState({ addNotes: e.target.value });
                }}
              ></textarea>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.closeModal()}>
              Close
            </Button>
            <Button variant="primary" onClick={() => this.closeSaveModal()}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default RecipeContainer;
