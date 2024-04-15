import ClientAdmin from "./ClientAdmin";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { getClients, deleteClient, getClientByDate } from "../../../services/ClientService";

const ClientAdminContainer = () => {
  const [clients, setClients] = useState([] || null);
  const [isLoadingClients, setIsLoadingClients] = useState(true);

  const loadClients = async () => {
    const response = await getClients();
    if (response.status === 200) {
      setClients(response.data.allClients);
    }

    setIsLoadingClients(false);
  };

  const destroyClient = async (id) => {
    const response = await deleteClient(id);
    if (response.status === 200) {
      loadClients();
    }
  };

  useEffect(() => {
    loadClients();
  }, []);


  const handleFilter = async (data) => {
      const res = await getClientByDate(data);
      if(res?.status === 200) { setClients(res?.data.allClients); };
  }; 

  return (
    <>
      {isLoadingClients ? (
        <div className="spinner-container">
          <Spinner
            thickness="4px"
            speed="350ms"
            emptyColor="gray.200"
            color="violet.200"
            size="xl"
          />
        </div>
      ) : (
        <ClientAdmin clients={clients} destroyClient={destroyClient} handleFilter={handleFilter} loadClients={loadClients} />
      )}
    </>
  );
};

export default ClientAdminContainer;
