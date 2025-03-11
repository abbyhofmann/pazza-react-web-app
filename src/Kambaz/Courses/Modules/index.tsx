/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function Modules() {
  const { cid } = useParams();
  const [modules, setModules] = useState<any[]>(db.modules);
  const [moduleName, setModuleName] = useState("");
  const addModule = () => {
    setModules([...modules, { _id: uuidv4(), name: moduleName, course: cid, lessons: [] }]);
    setModuleName("");
  };
  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m._id !== moduleId));
  };

  return (
    <div>
      <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={addModule} />

      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any, index: number) => (
            <ListGroup.Item key={index} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <FormControl className="w-50 d-inline-block"
                    defaultValue={module.name} />
                )}
                <LessonControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => {
                    deleteModule(moduleId);
                  }} />
              </div>
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons && module.lessons.map((lesson: any, index: number) => (
                  <ListGroup.Item className="wd-lesson p-3 ps-1" key={index}>
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                    <LessonControlButtons
                      moduleId={module._id}
                      deleteModule={(moduleId) => {
                        deleteModule(moduleId);
                      }} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}
