import { useState } from "react";
import AdoptionInfoModal from "../../components/visits/AdoptionInfoModal";
import styled from "styled-components";

function VisitReservationPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div>
      <AdoptionInfoModal closeModal={setIsModalOpen} isModalOpen={isModalOpen} />
    </div>
  )
}

export default VisitReservationPage;