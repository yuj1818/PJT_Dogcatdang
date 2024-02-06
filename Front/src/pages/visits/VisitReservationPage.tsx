import { useState } from "react";
import AdoptionInfoModal from "../../components/visits/AdoptionInfoModal";

function VisitReservationPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div>
      <AdoptionInfoModal closeModal={setIsModalOpen} isModalOpen={isModalOpen} />
    </div>
  )
}

export default VisitReservationPage;