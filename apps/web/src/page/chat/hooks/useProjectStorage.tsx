import { createContext, useContext, useState } from "react";

export interface ProjectItem {
  id: string;
  name: string;
  description?: string;
  aiProps?: string;
  createTime: string;
  updateTime: string;
}

type ProjectFn = (project: ProjectItem[]) => ProjectItem[];

interface ProjectContextType {
  projects: ProjectItem[];
  addProject: (project: ProjectItem) => void;
  updateProject: (projectFn: ProjectFn) => void;
  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  addProject: () => {},
  updateProject: () => {},
  deleteProject: () => {},
});

const useProjectStorage = () => useContext(ProjectContext);

interface Props {
  children: React.ReactNode;
}

const LOCAL_STORAGE_KEY = "ai-chat-projects";

const ProjectStorageProvider = ({ children }: Props) => {
  const getInitialProjects = () => {
    const projects = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (projects) {
      return JSON.parse(projects) as ProjectItem[];
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
      return [];
    }
  };
  const [projects, setProjects] = useState<ProjectItem[]>(getInitialProjects());

  const updateToLocalStorage = (newProjects: ProjectItem[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProjects));
  };

  const addProject = (project: ProjectItem) => {
    const newProjects = [...projects, project];
    updateToLocalStorage(newProjects);
    setProjects(newProjects);
  };

  const updateProject = (projectFn: ProjectFn) => {
    const newProject = projectFn(projects);
    updateToLocalStorage(newProject);
    setProjects(newProject);
  };

  const deleteProject = (id: string) => {
    const newProjects = projects.filter((o) => o.id !== id);
    updateToLocalStorage(newProjects);
    setProjects(newProjects);
  };

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, updateProject, deleteProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectStorageProvider, useProjectStorage };
