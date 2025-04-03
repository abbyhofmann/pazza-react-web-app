/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { setModules, addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };
  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  useEffect(() => {
    fetchModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };


  return (
    <div>
      <ModulesControls
        setModuleName={setModuleName}
        moduleName={moduleName}
        addModule={createModuleForCourse} />

      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .map((module: any, index: number) => (
            <ListGroup.Item key={index} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {isFaculty &&
                  <>
                    {!module.editing && module.name}
                    {module.editing && (
                      <FormControl className="w-50 d-inline-block"
                        onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            saveModule({ ...module, editing: false });
                          }
                        }}
                        defaultValue={module.name} />
                    )}
                    <ModuleControlButtons
                      moduleId={module._id}
                      deleteModule={removeModule}
                      editModule={(moduleId) => {
                        dispatch(editModule(moduleId));
                      }} />
                  </>
                }
                {!isFaculty && <>{module.name}</>}
              </div>
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons && module.lessons.map((lesson: any, index: number) => (
                  <ListGroup.Item className="wd-lesson p-3 ps-1" key={index}>
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                    {isFaculty &&
                      <ModuleControlButtons
                        moduleId={module._id}
                        deleteModule={removeModule}
                        editModule={(moduleId) => {
                          dispatch(editModule(moduleId));
                        }}
                      />
                    }
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}
