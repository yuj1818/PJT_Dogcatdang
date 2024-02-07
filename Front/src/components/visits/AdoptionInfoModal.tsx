import ReactModal from "react-modal";
import { Button } from "../common/Button";
import { Title, Bold } from "../common/Title";
import stage1 from "../../assets/adoption-info-stage1.png";
import stage2 from "../../assets/adoption-info-stage2.png";
import stage3 from "../../assets/adoption-info-stage3.png";

interface CheckInFo {
  isModalOpen: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const modalStyle = {
  content: {
    width: "65%",
    height: "auto",
    margin: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    overflow: "auto",
    padding: "0",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

const AdoptionInfoModal: React.FC<CheckInFo> = (props) => {
  const onClickCheckBtn = () => {
    props.closeModal((prev) => !prev);
  }

  return (
    <ReactModal
      isOpen={props.isModalOpen}
      onRequestClose={onClickCheckBtn}
      style={modalStyle}
    >
      <div className="flex justify-center py-8">
        <Title className="w-4/5">입양 절차 안내</Title>
      </div>
      <hr className="border-black" />
      <div className="flex flex-col gap-8 mt-8 items-center">
        <div className="flex items-center gap-6 w-4/5">
          <div className="flex flex-col items-center gap-2">
            <img className="w-4/5" src={ stage1 } alt="" />
            <Bold>방문 신청 전 확인</Bold>
          </div>
          <div className="flex flex-col gap-2">
            <p>독캣당 홈페이지에서 '보호 중인 동물'을 확인합니다</p>
            <p>보호 기관의 스트리밍 방송을 통해서도 확인할 수 있습니다</p>
          </div>
        </div>
        <div className="flex items-center gap-6 w-4/5">
          <div className="flex flex-col items-center gap-2">
            <img className="w-4/5" src={ stage2 } alt="" />
            <Bold>방문 신청</Bold>
          </div>
          <div className="flex flex-col gap-2">
            <p>방문 전 예약을 통해 승인을 받으면 예약 일자에 센터로 방문하시기 바랍니다.</p>
          </div>
        </div>
        <div className="flex items-center gap-6 w-4/5">
          <div className="flex flex-col items-center gap-2">
            <img className="w-4/5" src={ stage3 } alt="" />
            <Bold>방문 및 입양 신청</Bold>
          </div>
          <div className="flex flex-col gap-2">
            <p>입양은 1~2회 입양 상담 및 개체 만남을 통해 진행되며, 상담 후 설문지를 작성합니다.</p>
            <p>입양 후 파양은 불가능하니 여러 번 방문을 통해 신중하게 결정하시기 바랍니다.</p>
            <div>
              <p>입양 희망자가 여러 명인 경우, 기관 관리자들이 회의를 거쳐 선정하게 됩니다.</p>
              <p>선택이 안되더라도 양해해 주시기 바랍니다.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border border-black w-4/5 p-4">
          <Bold>유의사항 안내</Bold>
          <div className="flex flex-col gap-3 px-4">
            <div className="flex gap-2">
              <p>1.</p>
              <div>
                <p>입양 희망자가 여러 명인 경우, 기관 관리자들이 회의를 거쳐 선정하게 됩니다</p>
                <p>선택이 안되더라도 양해해 주시기 바랍니다.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <p>2.</p>
              <div>
                <p>입양을 진행하면서 각 가정에서 필요한 필수 물품을 권해드립니다.</p>
                <p>필요 물품들은 준비하여 편안한 가정환경을 만들어 주시기 바랍니다.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <p>3.</p>
              <div>
                <p>입양 후 파양은 불가합니다. 가족 구성원 모두가 신중하게 생각하시고 입양을 결정해주세요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-8">
        <Button 
          onClick={onClickCheckBtn} 
          background="black"
          $paddingX={1}
        >
          확인
        </Button>
      </div>
    </ReactModal>
  );
}

export default AdoptionInfoModal;