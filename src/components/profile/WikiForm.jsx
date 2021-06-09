import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import "moment/locale/es-mx";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormTextarea,
  Button,
} from "shards-react";
import { capitalizeData, validateWikiFields } from "../../utils/functions";
import { updateWikiItem } from "../../redux/WikiDuck";
import { useSelector, useDispatch } from "react-redux";

import Alerts from "../common/Alerts";

const WikiForm = ({ item }) => {
  console.log("WikiForm: ", item);

  const dispatch = useDispatch();
  const success = useSelector((store) => store.wiki.success);
  const err = useSelector((store) => store.wiki.err);

  const [alert, setAlert] = React.useState({});
  const [error, setError] = React.useState(null);
  const [edit, setEdit] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const [id, setId] = React.useState("");
  const [color, setColor] = React.useState("");
  const [diagnosticos, setDiagnosticos] = React.useState("");
  const [especie, setEspecie] = React.useState("");
  const [historia, setHistoria] = React.useState("");
  const [name, setName] = React.useState("");
  const [partic, setPartic] = React.useState("");
  const [pelaje, setPelaje] = React.useState("");
  const [vida, setVida] = React.useState("");

  React.useEffect(() => {
    const getData = () => {
      setId(item.id);
      setColor(item.color);
      setDiagnosticos(item.diagnosticos);
      setEspecie(item.especieID);
      setHistoria(item.historia);
      setName(item.nombre);
      setPartic(item.particularidades);
      setPelaje(item.pelaje);
      setVida(item.vida);
    };
    getData();
  }, [item]);

  React.useEffect(() => {
    if (success === true) {
      setAlert({
        message: "Datos actualizados correctamente.",
        theme: "success",
      });
      setOpen(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (err) {
      setAlert({
        message: "Ups, parece que hubo un error.",
        theme: "danger",
      });
      setOpen(true);
    }
  }, [success, err]);

  const animalFields = {
    id,
    color,
    diagnosticos,
    especie,
    historia,
    name,
    partic,
    pelaje,
    vida,
  };

  return (
    <div>
      <Card small className="mb-4">
        <CardHeader className="border-bottom">
          <h6 className="m-0">
            <span>Raza: {name}</span>
          </h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <Row form>
                    <Col md="4" className="form-group">
                      <label htmlFor="name">Nombre Raza</label>
                      <FormInput
                        disabled={edit}
                        id="name"
                        name="name"
                        placeholder="Nombre Raza"
                        onChange={(e) =>
                          capitalizeData(e.target.value, (res) => {
                            setName(res);
                          })
                        }
                        value={name}
                      />
                    </Col>
                    <Col md="4" className="form-group">
                      <label htmlFor="pelaje">Pelaje</label>
                      <FormInput
                        disabled={edit}
                        id="pelaje"
                        type="text"
                        placeholder="Pelaje"
                        onChange={(e) =>
                          capitalizeData(e.target.value, (res) => {
                            setPelaje(res);
                          })
                        }
                        value={pelaje}
                      />
                    </Col>
                    <Col md="4" className="form-group">
                      <label htmlFor="vida">Esperanza de Vida</label>
                      <FormInput
                        disabled={edit}
                        id="vida"
                        placeholder="Esperanza de vida"
                        type="text"
                        name="vida"
                        onChange={(e) => setVida(e.target.value)}
                        value={vida}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col className="form-group">
                      <label htmlFor="Historia">Historia</label>
                      <ReactQuill
                        readOnly={edit}
                        id="Historia"
                        name="Historia"
                        placeholder="Historia de la raza"
                        theme="snow"
                        value={historia || ""}
                        onChange={setHistoria}
                      />
                      {/* <FormTextarea
                        disabled={edit}
                        id="Historia"
                        name="Historia"
                        placeholder="Historia de la raza"
                        onChange={(e) =>
                          capitalizeData(e.target.value, (res) => {
                            setHistoria(res);
                          })
                        }
                        value={historia}
                      /> */}
                    </Col>
                  </Row>
                  <Row form>
                    <Col className="form-group">
                      <label htmlFor="particularidades">Particularidades</label>
                      <ReactQuill
                        readOnly={edit}
                        id="particularidades"
                        placeholder="Particularidades"
                        name="particularidades"
                        theme="snow"
                        value={partic || ""}
                        onChange={setPartic}
                      />
                      {/* <FormTextarea
                        disabled={edit}
                        id="particularidades"
                        placeholder="Particularidades"
                        name="particularidades"
                        onChange={(e) =>
                          capitalizeData(e.target.value, (res) => {
                            setPartic(res);
                          })
                        }
                        value={partic}
                      /> */}
                    </Col>
                  </Row>
                  <Row form>
                    <Col className="form-group">
                      <label htmlFor="diagnosticos">Diagnósticos</label>
                      <ReactQuill
                        readOnly={edit}
                        id="diagnosticos"
                        name="diagnosticos"
                        placeholder="Diagnósticos"
                        theme="snow"
                        value={diagnosticos || ""}
                        onChange={setDiagnosticos}
                      />
                      {/* <FormInput
                        disabled={edit}
                        id="diagnosticos"
                        name="diagnosticos"
                        placeholder="Diagnósticos"
                        onChange={(e) =>
                          capitalizeData(e.target.value, (res) => {
                            setDiagnosticos(res);
                          })
                        }
                        value={diagnosticos}
                      /> */}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4" className="form-group">
                      <Button
                        type="button"
                        theme="accent"
                        onClick={(e) => {
                          if (!edit) {
                            validateWikiFields(e, animalFields, (res) => {
                              console.log("respuesta validacion info: ", res);
                              if (res.valid === false) {
                                setError(res.error);
                              } else {
                                setError(null);
                                dispatch(updateWikiItem(animalFields));
                              }
                            });
                          } else {
                            setEdit(!edit);
                          }
                        }}
                      >
                        {edit ? "Habilitar Campos" : "Guardar Cambios"}
                      </Button>
                    </Col>
                    <Col className="form-group">
                      {error && (
                        <div className="alert alert-warning">{error}</div>
                      )}
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
      <Alerts
        open={open}
        close={() => {
          setOpen(!open);
        }}
        message={alert.message}
        theme={alert.theme}
      />
    </div>
  );
};

export default WikiForm;
