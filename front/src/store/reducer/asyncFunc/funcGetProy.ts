import axios from "axios";
import { ArgsGetProjects } from "src/types/store/argsFuncProjects";

export const getProjets = async ({ numPro }: ArgsGetProjects) => {
    const projects = await axios.get(`/proyects${numPro ? '?numPro=' + numPro : ''}`);
    return projects;
}