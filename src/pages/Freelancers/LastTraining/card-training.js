import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import {
  Badge,
  Card,
  CardBody,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import images from "assets/images";
import companies from "assets/images/companies";

const CardTrainging = ({ projects }) => {
  return (
    <React.Fragment>
      {projects?.map((project, key) => (
        <Col xl="4" sm="6" key={key}>
        <Card>
          <CardBody>
            <div className="d-flex">
              <div className="avatar-md me-4">
                <span className="avatar-title rounded-circle bg-light text-danger font-size-16">
                  <img src={companies[project.img]} alt="" height="30" />
                </span>
              </div>

              <div className="flex-grow-1 overflow-hidden">
                <h5 className="text-truncate font-size-15">
                  <Link
                    to={`/projects-overview/${project.id}`}
                    className="text-dark"
                  >
                    {project.name}
                  </Link>
                </h5>
                <p className="text-muted mb-4">{project.description}</p>
{/* 
                <div className="avatar-group">
                  {project.team.map((team, key) =>
                    !team.img || team.img !== "Null" ? (
                      <React.Fragment key={key}>
                        <div className="avatar-group-item">
                          <Link
                            to="#"
                            className="d-inline-block"
                            id={"member" + key}
                          >
                            <img
                              src={images[team.img]}
                              className="rounded-circle avatar-xs"
                              alt=""
                            />
                            <UncontrolledTooltip
                              placement="top"
                              target={"member" + key}
                            >
                              {team.fullname}
                            </UncontrolledTooltip>
                          </Link>
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={key}>
                        <div className="avatar-group-item">
                          <Link
                            to="#"
                            className="d-inline-block"
                            id={"member" + key}
                          >
                            <div className="avatar-xs">
                              <span
                                className={
                                  "avatar-title rounded-circle bg-soft bg-" +
                                  team.color +
                                  " text-" +
                                  team.color +
                                  " font-size-16"
                                }
                              >
                                {team.name}
                              </span>
                              <UncontrolledTooltip
                                placement="top"
                                target={"member" + key}
                              >
                                {team.fullname}
                              </UncontrolledTooltip>
                            </div>
                          </Link>
                        </div>
                      </React.Fragment>
                    )
                  )}
                </div> */}
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
      ))}
    </React.Fragment>
  );
};

CardTrainging.propTypes = {
  projects: PropTypes.array,
};

export default CardTrainging;
