import React, { createRef, useRef } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import Dropdown from "react-bootstrap/Dropdown";

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      showModal: false,
      showTip: false,
      showNotes: false,
    };

    this.target = React.createRef();
  }

  delete() {
    console.log("RID11234324: " + this.props.id);
    this.props.delete(this.props.id);
  }

  edit() {
    let editInfo = [];

    editInfo.push(
      this.props.name,
      this.props.category,
      this.props.score,
      this.props.sauceRank,
      this.props.cost,
      this.props.source,
      this.props.note,
      this.props.id
    );

    this.props.edit(editInfo);
  }

  isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  showName() {
    if (this.isValidHttpUrl(this.props.source)) {
      return (
        <Row id="recipe_name">
          <a id="recipe_link" target="_blank" href={this.props.source}>
            {this.props.name}
          </a>
        </Row>
      );
    } else {
      return (
        <Row
          id="recipe_name_no_link"
          onClick={() => {
            if (this.state.showTip) {
              this.setState({ showTip: false });
            } else {
              this.setState({ showTip: true });
            }
          }}
        >
          {" "}
          {this.props.name}{" "}
        </Row>
      );
    }
  }

  showSource() {
    if (this.state.showTip) {
      return (
        <Row id="recipe_source">
          <em>Source: {this.props.source}</em>
        </Row>
      );
    }
  }

  toggleNotes() {
    if (this.state.showNotes) {
      this.setState({ showNotes: false });
    } else {
      this.setState({ showNotes: true });
    }
  }

  showNoteText() {
    if (this.state.showNotes) {
      return <div>{this.props.note}</div>;
    }
  }

  showColorRating() {
    if (this.props.score <= 1) {
      return (
        <Row id="oneColor">
          {this.props.score} <div id="vert_div"></div>
        </Row>
      );
    } else if (this.props.score <= 2) {
      return (
        <Row id="twoColor">
          {this.props.score} <div id="vert_div"></div>
        </Row>
      );
    } else if (this.props.score <= 3) {
      return (
        <Row id="threeColor">
          {this.props.score} <div id="vert_div"></div>
        </Row>
      );
    } else if (this.props.score <= 4) {
      return (
        <Row id="fourColor">
          {this.props.score} <div id="vert_div"></div>
        </Row>
      );
    } else if (this.props.score <= 5) {
      return (
        <Row id="fiveColor">
          {this.props.score} <div id="vert_div"></div>
        </Row>
      );
    } else if (this.props.score <= 6) {
      return (
        <Row id="sixColor">
          {this.props.score}
          <div id="vert_div"></div>
        </Row>
      );
    } else if (this.props.score <= 7) {
      return (
        <Row id="sevenColor">
          {this.props.score} <div id="vert_div"></div>
        </Row>
      );
    } else if (this.props.score <= 8) {
      return (
        <Row id="eightColor">
          {this.props.score} <div id="vert_div"></div>
        </Row>
      );
    } else if (this.props.score <= 9) {
      return (
        <Row id="nineColor">
          {this.props.score} <div id="vert_div"></div>
        </Row>
      );
    } else if (this.props.score <= 10) {
      return (
        <Row id="tenColor">
          {this.props.score} <div id="vert_div"></div>
        </Row>
      );
    }
  }

  showColorSauceRating() {
    if (this.props.sauceRank == 0 || this.props.sauceRank == -1) {
      return
    }
    else if (this.props.sauceRank <= 1) {
      return (
        <Row id="oneColorS">
          {this.props.sauceRank} 
        </Row>
      );
    } else if (this.props.sauceRank <= 2) {
      return (
        <Row id="twoColorS">
          {this.props.sauceRank} 
        </Row>
      );
    } else if (this.props.sauceRank <= 3) {
      return (
        <Row id="threeColorS">
          {this.props.sauceRank} 
        </Row>
      );
    } else if (this.props.sauceRank <= 4) {
      return (
        <Row id="fourColorS">
          {this.props.sauceRank} 
        </Row>
      );
    } else if (this.props.sauceRank <= 5) {
      return (
        <Row id="fiveColorS">
          {this.props.sauceRank} 
        </Row>
      );
    } else if (this.props.sauceRank <= 6) {
      return (
        <Row id="sixColorS">
          {this.props.sauceRank}
          <div id="vert_div"></div>
        </Row>
      );
    } else if (this.props.sauceRank <= 7) {
      return (
        <Row id="sevenColorS">
          {this.props.sauceRank} 
        </Row>
      );
    } else if (this.props.sauceRank <= 8) {
      return (
        <Row id="eightColorS">
          {this.props.sauceRank}
        </Row>
      );
    } else if (this.props.sauceRank <= 9) {
      return (
        <Row id="nineColorS">
          {this.props.sauceRank} 
        </Row>
      );
    } else if (this.props.sauceRank <= 10) {
      return (
        <Row id="tenColorS">
          {this.props.sauceRank} 
        </Row>
      );
    }
  }

  render() {
    return (
      <Container id="recipe_card">
        <Row>
          <Col id="recipe_name_category">
            {/* <Row id="recipe_name"><a id="recipe_link" target="_blank" href={this.props.source}>{this.props.name}</a></Row> */}
            {this.showName()}
            {this.showSource()}
            <Row id="recipe_category">
              {this.props.category} ({this.props.cost})
            </Row>
          </Col>
          <Col id="recipe_rating">
            <Row>{this.showColorRating()}</Row>
            <Row>{this.showColorSauceRating()}</Row>
            
          </Col>
          <Col id="note_section">
            {/* <Row>
              {" "}
              <Button
                id="recipe_edit"
                variant="outline-dark"
                onClick={() => this.toggleNotes()}
              >
                Notes
              </Button>
            </Row>
            <Row>{this.showNoteText()}</Row> */}
            {this.props.note}
          </Col>
        </Row>
        <Button
          id="recipe_delete"
          variant="outline-danger"
          onClick={() => this.delete()}
        >
          Delete
        </Button>
        <Button
          id="recipe_edit"
          variant="outline-dark"
          onClick={() => this.edit()}
        >
          Edit
        </Button>
      </Container>
    );
  }
}

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>;

export default Recipe;
