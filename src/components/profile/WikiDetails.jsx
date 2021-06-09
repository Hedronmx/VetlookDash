import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/es-mx";
import { Card, CardBody, ListGroup, ListGroupItem } from "shards-react";

import "../../assets/scss/Styles.scss";
import defaultImage from "../../assets/images/default-pet-image.jpg";

const WikiDetails = ({ item }) => {
  const [photo, setPhoto] = React.useState("");

  React.useEffect(() => {
    const profilePicture = () => {
      if (
        item.imagen === undefined ||
        item.imagen === false ||
        item.imagen === null ||
        item.imagen === "/assets/placeholder.jpg"
      ) {
        setPhoto(defaultImage);
      } else {
        setPhoto(item.imagen);
      }
    };
    profilePicture();
  }, [photo, item]);
  return (
    <Card small className="mb-4 pt-3">
      <CardBody>
        <div className="row">
          <div className="col-12 col-lg-4 col-md-4 col-sm-12 text-center">
            <div className="m-auto">
              <img
                className="rounded-circle item-img"
                src={photo}
                alt="item profile"
              />
            </div>
            <h4 className="mb-0">{`${item.nombre}`}</h4>
            <span className="text-muted d-block mb-2 text-capitalize">
              Vetlook
            </span>
          </div>
          <div className="col-12 col-lg-4 col-md-4 col-sm-12">
            <table class="table table-hover table-responsive table-sm">
              <tbody>
                <tr>
                  <th scope="row">Color</th>
                  <td dangerouslySetInnerHTML={{ __html: item.color }}></td>
                </tr>
                <tr>
                  <th scope="row">Pelaje</th>
                  <td>{item.pelaje}</td>
                </tr>
                <tr>
                  <th scope="row">Especie</th>
                  <td>{item.especieID}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-12 col-lg-4 col-md-4 col-sm-12">
            <table class="table table-hover table-responsive table-sm">
              <tbody>
                <tr>
                  <th scope="row">Diagnósticos</th>
                  <td
                    dangerouslySetInnerHTML={{ __html: item.diagnosticos }}
                  ></td>
                </tr>
                <tr>
                  <th scope="row">Historia</th>
                  <td dangerouslySetInnerHTML={{ __html: item.historia }}></td>
                </tr>
                <tr>
                  <th scope="row">Particularidades</th>
                  <td
                    dangerouslySetInnerHTML={{ __html: item.particularidades }}
                  ></td>
                </tr>
                <tr>
                  <th scope="row">Esperanza de Vida</th>
                  <td>{item.vida}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default WikiDetails;
