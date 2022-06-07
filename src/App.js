import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import RecipeContainer from "./RecipeContainer";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import { signInWithGoogle, db } from "./Firebase";
import firebase from "firebase/app";
// import "firebase/firestore";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  where,
  query,
  getDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import { async } from "@firebase/util";

function App() {
  const [newReview, setNewReview] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [show, setShow] = useState(false);
  const recipesReference = collection(db, "Recipes");
  const usersReference = collection(db, "Users");
  const [userName, setUserName] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(-1);
  const [sauceRating, setSauceRating] = useState(-1);
  const [cost, setCost] = useState("");
  const [source, setSource] = useState("");
  const [notes, setNotes] = useState("");
  const [id, setID] = useState(-1);
  const [currUser, setCurrUser] = useState("-1");
  const [oneChecked, setOneChecked] = useState(false);
  const [twoChecked, setTwoChecked] = useState(false);
  const [threeChecked, setThreeChecked] = useState(false);
  const [fourChecked, setFourChecked] = useState(false);
  const [fiveChecked, setFiveChecked] = useState(false);

  useEffect(() => {
    console.log("USER EFFECT CALLED");
    console.log(db);
    console.log("DB^^^^");
    // USING MYSQL ------------------------
    // Axios.get("http://localhost:3001/api/get").then((response) => {
    //   setRecipeList(response.data);
    // });

    const getRecipes = async () => {
      console.log(currUser);
      console.log(localStorage.getItem("userId"));
      let q = query(
        recipesReference,
        where("UserID", "==", localStorage.getItem("userId")),
        orderBy("Rating", "desc")
      );
      // let r = query(recipesReference,orderBy("Rating", "desc"))
      const data = await getDocs(q);

      // const data = await getDocs(recipesReference);
      console.log(data);
      setRecipeList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getUsers = async () => {
      const userData = await getDocs(usersReference);
      setUserList(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    setCurrUser(localStorage.getItem("userId"));
    setUserName(localStorage.getItem("name"));
    console.log("setting userId to " + localStorage.getItem("userId"));
    getUsers();
    getRecipes();
  }, []);

  const addRecipe = async (data) => {
    // Axios.post("http://localhost:3001/api/insert", {
    // UserID: user,
    // Name: data[0],
    // Category: data[1],
    // Rating: data[2],
    // SauceRating: data[3],
    // Cost: data[4],
    // Source: data[5],
    // Notes: data[6],
    // });

    let addedDoc = await addDoc(recipesReference, {
      UserID: currUser,
      Name: data[0],
      Category: data[1],
      Rating: Number(data[2]),
      SauceRating: Number(data[3]),
      Cost: data[4],
      Source: data[5],
      Notes: data[6],
    });
    let fullDoc = await getDoc(addedDoc);
    let temp = recipeList;
    let toAdd = {
      UserID: currUser,
      Name: data[0],
      Category: data[1],
      Rating: Number(data[2]),
      SauceRating: Number(data[3]),
      Cost: data[4],
      Source: data[5],
      Notes: data[6],
      id: fullDoc.id,
    };

    console.log("toAdd");
    console.log(toAdd);

    let firstHalf = temp.filter((e) => {
      return e.Rating >= Number(data[2]);
    });

    let secondHalf = temp.filter((e) => {
      return e.Rating < Number(data[2]);
    });

    console.log("firstHalf");
    firstHalf.push(toAdd);

    for (let i = 0; i < secondHalf.length; i++) {
      firstHalf.push(secondHalf[i]);
      console.log(firstHalf);
    }

    console.log(firstHalf);

    // for (let i = 0; i < temp.length; i++) {
    //   if (temp[i].Rating <= data[2]) {

    //     temp.splice(i, 0, toAdd);
    //   }
    // }

    // setRecipeList([...temp]);

    setRecipeList([
      ...firstHalf,
      // {
      //   UserID: currUser,
      //   Name: data[0],
      //   Category: data[1],
      //   Rating: data[2],
      //   SauceRating: data[3],
      //   Cost: data[4],
      //   Source: data[5],
      //   Notes: data[6],
      // },
    ]);
    // window.location.href = window.location.href;
  };

  async function deleteRecipe(rid) {
    let temp = recipeList;
    let ret = [];

    // Axios.delete("http://localhost:3001/api/delete/" + rid);

    console.log("RID: " + rid);

    const userDoc = doc(db, "Recipes", rid);
    await deleteDoc(userDoc);

    for (let i = 0; i < temp.length; i++) {
      // if (temp[i].ID == rid) {
      if (temp[i].id == rid) {
        temp.splice(i, 1);
        break;
      }
    }

    setRecipeList([...temp]);
  }

  function closeModal() {
    setShow(false);
  }

  async function closeSaveModal() {
    // Axios.put("http://localhost:3001/api/update", {
    //   ID: id,
    // Name: name,
    // Category: category,
    // Rating: rating,
    // SauceRating: sauceRating,
    // Cost: cost,
    // Source: source,
    // Notes: notes,
    // });

    const userDoc = doc(db, "Recipes", id);
    const newFields = {
      Name: name,
      Category: category,
      Rating: Number(rating),
      SauceRating: Number(sauceRating),
      Cost: cost,
      Source: source,
      Notes: notes,
    };

    await updateDoc(userDoc, newFields);

    let temp = recipeList;
    let toAdd = [];

    for (let i = 0; i < temp.length; i++) {
      if (temp[i].id == id) {
        temp[i].Name = name;
        temp[i].Category = category;
        temp[i].Rating = rating;
        temp[i].SauceRating = sauceRating;
        temp[i].Cost = cost;
        temp[i].Source = source;
        temp[i].Notes = notes;
        toAdd = temp[i];
        console.log("setting toAdd to:");
        console.log(toAdd);
        temp.splice(i, 1);
        break;
      }
    }
    // let toAdd = {
    //   Name: name,
    //   Category: category,
    //   Rating: Number(rating),
    //   SauceRating: Number(sauceRating),
    //   Cost: cost,
    //   Source: source,
    //   Notes: notes,
    // };

    console.log("toAdd");
    console.log(toAdd);

    let firstHalf = temp.filter((e) => {
      return e.Rating >= Number(rating);
    });

    let secondHalf = temp.filter((e) => {
      return e.Rating < Number(rating);
    });

    console.log("firstHalf");
    firstHalf.push(toAdd);

    for (let i = 0; i < secondHalf.length; i++) {
      firstHalf.push(secondHalf[i]);
      console.log(firstHalf);
    }

    console.log(firstHalf);

    setRecipeList([...firstHalf]);

    setShow(false);
    // window.location.href = window.location.href;
  }

  function checkChecked(data) {
    console.log("Checking if " + data + " = " + cost);
    if (data == cost) {
      return true;
    } else {
      return false;
    }
  }

  function showModal(data) {
    setOneChecked(false);
    setTwoChecked(false);
    setThreeChecked(false);
    setFourChecked(false);
    setFiveChecked(false);

    setName(data[0]);
    setCategory(data[1]);
    setRating(data[2]);

    if (data[3] == -1 || isNaN(data[3])) {
      setSauceRating("N/A");
    } else {
      setSauceRating(data[3]);
    }

    if (data[4] === "$") {
      setOneChecked(true);
    } else if (data[4] === "$$") {
      setTwoChecked(true);
    } else if (data[4] === "$$$") {
      setThreeChecked(true);
    } else if (data[4] === "$$$$") {
      setFourChecked(true);
    } else if (data[4] === "$$$$$") {
      setFiveChecked(true);
    }

    setCost(data[4]);
    setSource(data[5]);
    setNotes(data[6]);
    setID(data[7]);

    setShow(true);
  }

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async function signIn() {
    console.log("signIn() called");
    await signInWithGoogle();

    if (localStorage.getItem("email")) {
      console.log("email is not null");
      console.log("about to check if the email given is already in userList");
      var result = userList.find((obj) => {
        console.log(obj);
        console.log(
          "checking " + obj.Email + " against " + localStorage.getItem("email")
        );
        return obj.Email === localStorage.getItem("email");
      });

      //found user already in db that has that email
      if (result != undefined) {
        console.log(
          "found that " +
            localStorage.getItem("email") +
            " is already in userList, setting currUser to " +
            result.id
        );
        setCurrUser(result.id);
        setUserName(localStorage.getItem("name"));
        localStorage.setItem("userId", result.id);
      } else {
        //add user to Users db and set current user
        let newId = "";

        await addDoc(usersReference, {
          id: newId,
          Name: localStorage.getItem("name"),
          Email: localStorage.getItem("email"),
        }).then((docRef) => {
          newId = docRef.id;
        });

        console.log(
          "email was not found in userList, adding it with a generated id of " +
            newId
        );
        setCurrUser(newId);
        setUserName(localStorage.getItem("name"));
        localStorage.setItem("userId", newId);
      }
    }
    window.location.href = window.location.href;
  }

  function signOut() {
    localStorage.clear();
    window.location.href = window.location.href;
  }

  function logOutButton() {
    if (localStorage.getItem("email")) {
      return (
        <Button onClick={signOut} id="login_with_google_btn">
          Log Out
        </Button>
      );
    }
  }

  return (
    <div className="App">
      <h1>RECIPE RANKER</h1>

      <Button onClick={signIn} id="login_with_google_btn">
        Sign In With Google
      </Button>

      {logOutButton()}

      {/* {userName} */}

      <RecipeContainer
        add={(data) => addRecipe(data)}
        delete={(data) => deleteRecipe(data)}
        edit={(data) => showModal(data)}
        recipes={recipeList}
      />

      <Modal id="edit_modal" show={show} onHide={() => closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row id="input_row">
            <p id="modal_label">
              Name <span id="red_star">*</span>{" "}
            </p>
            <input
              type="text"
              id="addInput"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Row>
          <Row id="input_row">
            <p id="modal_label">
              Category <span id="red_star">*</span>{" "}
            </p>
            <input
              type="text"
              id="addInput"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </Row>
          <Row id="input_row">
            <p id="modal_label">
              Rating <span id="red_star">*</span>{" "}
            </p>
            <Row id="center_rating">{rating}</Row>
            {/* <input
              type="decimal"
              id="addInput"
              value=
              onChange={(e) => {
                setRating(e.target.value);
              }}
            /> */}
            <input
              type="range"
              list="tickmarks"
              step="0.1"
              min="0"
              max="10"
              class="slider"
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
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
            Sauce Rating
            <Row id="center_rating">{sauceRating}</Row>
            <input
              type="range"
              list="tickmarks"
              step="0.1"
              min="0"
              max="10"
              class="slider"
              value={sauceRating}
              onChange={(e) => {
                setSauceRating(e.target.value);
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
            {/* <p>This is a <span class="red_star">red</span> word in a sentence</p> */}
            {/* <input
              type="text"
              id="addInput"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            /> */}
            <div id="costChoice">
              <input
                type="radio"
                id="contactChoice1"
                name="contact"
                value="email"
                onClick={() => {
                  setCost("$");
                }}
                defaultChecked={oneChecked}
              />
              <label htmlFor="contactChoice1">$</label>

              <input
                type="radio"
                id="contactChoice2"
                name="contact"
                value="phone"
                onClick={() => {
                  setCost("$$");
                }}
                defaultChecked={twoChecked}
              />
              <label htmlFor="contactChoice2">$$</label>

              <input
                type="radio"
                id="contactChoice3"
                name="contact"
                value="mail"
                onClick={() => {
                  setCost("$$$");
                }}
                defaultChecked={threeChecked}
              />
              <label htmlFor="contactChoice3">$$$</label>
              <input
                type="radio"
                id="contactChoice4"
                name="contact"
                value="mail"
                onClick={() => {
                  setCost("$$$$");
                }}
                defaultChecked={fourChecked}
              />
              <label htmlFor="contactChoice3">$$$$</label>
              <input
                type="radio"
                id="contactChoice5"
                name="contact"
                value="mail"
                onClick={() => {
                  setCost("$$$$$");
                }}
                defaultChecked={fiveChecked}
              />
              <label htmlFor="contactChoice3">$$$$$</label>
            </div>
          </Row>
          <Row id="input_row">
            Source
            <input
              type="text"
              id="addInput"
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
              }}
            />
          </Row>
          <Row id="input_row">
            Notes
            <textarea
              rows="5"
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            ></textarea>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => closeSaveModal()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
