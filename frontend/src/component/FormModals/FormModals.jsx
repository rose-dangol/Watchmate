import { g } from "framer-motion/client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {createMovie} from "../../services/movie"
 import { useNavigate } from 'react-router-dom';

function FormModals(props) {
  
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ title: "", storyline: "" });
  const navigate = useNavigate();


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log("name",name);
    console.log("value", value);
    setFormData((prev) => {
        const updatedData = {...prev, [name]:value}
        return updatedData;
    });
  };
  const handleSubmit = async() => {
    // console.log(updatedData)
    await createMovie(formData)
    navigate('/browse'); 
    handleClose()
  };
  return (
    // {page=='Movie'? (
      <>
      <Button variant="primary" onClick={handleShow}>
        -Add New Movie-
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your favourite movies~</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Movie Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Movie Title"
                autoFocus
                onChange={handleChange}
                name="title"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Storyline</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleChange}
                name="storyline"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    {/* </>
    ):(
      <> */}
        <p>cnsjcns</p>
      </>
    )}


export default FormModals;
