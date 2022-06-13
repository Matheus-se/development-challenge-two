import { IManagePatientsProps } from "../data/interfaces/ImanagePatientsProps.interface";
import ManagePatients from "./managePatients";

const HomePage: React.FC<{ data: IManagePatientsProps }> = () => {
  return <ManagePatients/>;
};

export default HomePage;
