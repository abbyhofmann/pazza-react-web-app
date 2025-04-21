/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Button, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as assignmentClient from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  const [assignments, setAssignments] = useState<any[]>([]);

  const fetchAssignments = async () => {
    try {
      const amts = await assignmentClient.findAssignmentsForCourse(cid);
      setAssignments(amts);
    } catch (error) {
      console.error(error);
    }
  };

  const createAssignment = async (amt: any) => {
    const newAssignment = await assignmentClient.createAssignment(amt);
    setAssignments([...assignments, newAssignment]);
  }

  const removeAssignment = async (amtId: string) => {
    await assignmentClient.deleteAssignment(amtId);
    setAssignments(assignments.filter((a) => a._id !== amtId));
  }

  useEffect(() => {
    fetchAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="wd-assignments">
      {/* TODO: magnifying glass icon + sizing */}
      <div>
        <div className="m-4">
          <input placeholder="Search..."
            id="wd-search-assignment" />
          {isFaculty &&
            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment" onClick={createAssignment}>
              <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Assignment
            </Button>
          }
          {isFaculty &&
            <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-assignment-group">
              <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Group
            </Button>
          }
        </div>
      </div>
      <div className="p-4">
        <ListGroup className="rounded-0" id="wd-assignments">
          <ListGroup.Item className="wd-assignment p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              Assignments
              <IoEllipsisVertical className="float-end fs-4" />
              {isFaculty &&
                <FaPlus className="float-end" />
              }
              <Badge pill bg="secondary" text="dark" className="me-2 border border-dark float-end">40% of Total</Badge>
            </div>
            <ListGroup className="wd-assignments rounded-0">
              {assignments.filter((a: any) => a.course === cid).map((a: any, index: number) => {
                const link = `${pathname}/${a._id}`;
                return (
                  <ListGroup.Item className="wd-lesson p-3 ps-1" key={index}>
                    {isFaculty &&
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      <ModuleControlButtons moduleId={a._id} deleteModule={removeAssignment} editModule={function (_moduleId: string): void {
                        throw new Error("Function not implemented.");
                      }} />
                    }
                    <div style={{ width: "75%" }}>
                      <BsGripVertical className="me-2 fs-3" />
                      {isFaculty &&
                        <Link to={link}>
                          <FaPencilAlt className="text-success fs-4 me-4" />
                        </Link>
                      }
                      {a.title}
                      <p className="ms-4 mt-2">
                        <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> {a.from ?? "May 6 at 12:00am"} | <b>Due</b> {a.until ?? "May 13 at 11:59pm | 100 pts"}
                      </p>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}
