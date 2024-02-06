import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ResultBox = styled.div`
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(45, 45, 45);
  border-radius: 15px;
  padding: 2rem;
`;

const Rowdiv = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const StyledButton = styled.button`
  background-color: #ff8331;
  color: white;
  width: 100%;
  padding: 2rem;
  border: 5px solid #ff8331;
  border-radius: 15px;
  margin: 10px;
  font-size: 20px;
`;

const StyledHeading = styled.h5`
  padding: 10px;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const StyledResetButton = styled.button`
  display: flex;
  text-align: center;
  color: white;
  border-radius: 15px;
  padding: 1rem;
  font-size: 20px;
  width: 180px;
  height: 70px;
  background-color: #ff8331;
`;

const StyledAnimalsButton = styled.button`
  background-color: #ff8331;
  color: white;
  border-radius: 15px;
  font-size: 20px;
  width: 200px;
  flex-direction: column;
  align-items: center;
  padding-bottom: 13px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 19px;
`;

const DetailBox = styled.div`
  background-color: rgb(45, 45, 45, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Detaillists = styled.div`
  margin-bottom: 1rem;
`;

const RefreshImg = styled.img`
  width: 38px;
  height: 39px;
  margin-right: 1rem;
`;

function AnimalMatching() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [resultImgSrc, setResultImgSrc] = useState<string | null>(null);
  const [resultDescLines, setResultDescLines] = useState<string[]>([]);

  const questions = [
    {
      num: 0,
      question: "기분이 좋지 않을 때 난",
      answers: [
        {
          type: "포메라니안",
          score: 2,
          content:
            "기분이 좋지 않을 땐 혼자 있다가 기분이 나아 질 때 힘차게 돌아온다.",
        },
        {
          type: "치와와",
          score: 5,
          content:
            "기분이 좋지 않을 때 누군가 날 건들이면 그 사람에 대해 참고 있던 게 폭발한다. ",
        },
        {
          type: "비글",
          score: 10,
          content: "“아 몰랑! 그냥 신경 안쓸래에에에에!!!” 하고 털어낸다.",
        },
        {
          type: "리트리버",
          score: 10,
          content: "세상 살며 기분 안 좋을 일이 별로 없다.",
        },
      ],
    },
    {
      num: 1,
      question: "다음 중 나의 연애 스타일과 가장 비슷한 것은?",
      answers: [
        {
          type: "포메라니안",
          score: 2,
          content: "애인도! 친구도! 다 같이 놀면 얼마나 좋아!? 둘 다 내꺼! ",
        },
        {
          type: "웰시코기",
          score: 5,
          content:
            "집착 싫어! 집착은NO! 알아서 잘할 게! 의심하지 말아줬으면 좋겠어!",
        },
        {
          type: "리트리버",
          score: 10,
          content: "질투는 잘 안 하는 편인데... 집착도 딱히…?",
        },
        {
          type: "치와와",
          score: 10,
          content:
            "난 질투쟁이인데? 질투를 하는 만큼 그 사람을 좋아한다는 거 아냐?\n ...넌 나만 바라봐.",
        },
      ],
    },
    {
      num: 2,
      question: "첫 조별과제 날, 과연 나의 역할은?",
      answers: [
        {
          type: "치와와",
          score: 2,
          content: "모두를 컨트롤 하는 리더십의 끝판 왕 조장",
        },
        {
          type: "웰시코기",
          score: 5,
          content: "화려한 나의 발표실력을 보여주지, 발표자",
        },
        {
          type: "리트리버",
          score: 10,
          content: "꼼꼼함은 필수! 자료조사",
        },
        {
          type: "포메라니안",
          score: 10,
          content: "미적 센스가 필요한 PPT",
        },
      ],
    },
    {
      num: 3,
      question: "드디어 동창회날, 과연 나는?",
      answers: [
        {
          type: "비글",
          score: 2,
          content:
            "여기저기 아는 사람과 반갑게 인사하며, 돌아다니면서 노는 인싸 스타일",
        },
        {
          type: "리트리버",
          score: 5,
          content:
            "가만히 있어도 주변에 친구들이 먼저 다가오는 인기쟁이 스타일",
        },
        {
          type: "포메라니안",
          score: 10,
          content:
            "처음에 낯을 가려 조금 어색해하지만 금세 친해져서 재밌게 분위기를 주도하는 반인싸스타일",
        },
        {
          type: "치와와",
          score: 10,
          content:
            "아는 친구들은 많지 않지만 친한 친구들과는 재밌게 노는 스타일",
        },
      ],
    },
    {
      num: 4,
      question: "드디어 기다렸던 주말! 나의 모습은?",
      answers: [
        {
          type: "리트리버",
          score: 2,
          content:
            "집밖은 위험해~잠을 자거나 침대 위에서 크게 벗어나지 않는 휴식",
        },
        {
          type: "웰시코기",
          score: 5,
          content:
            "집에서 쉬는 건 너무 시간이 안 가 친구들에게 만나자고 연락한다.",
        },
        {
          type: "비글",
          score: 10,
          content:
            "주말에는 무조건 나가야지! 평일에 미리 봐두었던 힙한 곳과 핫플인 곳을 찾아간다.",
        },
        {
          type: "치와와",
          score: 10,
          content:
            "평일에 받은 스트레스를 맛난 음식을 먹으며, 미뤄왔던 영화나 드라마를 본다.",
        },
      ],
    },
    {
      num: 5,
      question: "인형을 선물 받았다. 어떤 인형일까?",
      answers: [
        {
          type: "포메라니안",
          score: 2,
          content: "극세사로 만든 복슬거리는 중간사이즈 강아지 인형",
        },
        {
          type: "비글",
          score: 5,
          content: "껴안고 자기 좋은 길다란 바나나 인형",
        },
        {
          type: "리트리버",
          score: 10,
          content: "완전 큰 곰인형",
        },
        {
          type: "웰시코기",
          score: 10,
          content: "납작해서 베개로 사용하기도 딱 좋은 원숭이 인형",
        },
      ],
    },
    {
      num: 6,
      question: "놀이공원에서 당신의 모습은?",
      answers: [
        {
          type: "비글",
          score: 2,
          content: "귀신의 집, 롤러코스터 등 가능한 모든 기구를 다 타본다!",
        },
        {
          type: "웰시코기",
          score: 5,
          content: "딱히 불평하지 않고 다 탄다!",
        },
        {
          type: "포메라니안",
          score: 10,
          content:
            "궁금은 하지만 겁이 많아서 고민하거나 무서운 건 타지 않는다.",
        },
        {
          type: "치와와",
          score: 10,
          content: "타긴 다 타지만 힘들면 못타는 사람과 함께 쉰다.",
        },
      ],
    },
    {
      num: 7,
      question: "맛집을 가자는 친구들의 말에 나는?",
      answers: [
        {
          type: "비글",
          score: 2,
          content: "맛집 리스트 보유자라면서 적극적으로 맛집을 홍보한다.",
        },
        {
          type: "치와와",
          score: 5,
          content: "맛집이라고 추천하는 친구의 말에 따라간다.",
        },
        {
          type: "리트리버",
          score: 10,
          content: "아무 곳이든 상관 ㄴㄴ 별생각이 없다.",
        },
        {
          type: "웰시코기",
          score: 10,
          content: "일단 만나 돌아다니며 맛집스러워 보이는 곳에 들어간다.",
        },
      ],
    },
    {
      num: 8,
      question: "파티가 있을 때 나의 드레스 코드는?",
      answers: [
        {
          type: "비글",
          score: 2,
          content:
            "주인공은 바로 나, 돋보일 수 있게 화려하고 멋있게 최대한 꾸미고 간다.",
        },
        {
          type: "포메라니안",
          score: 5,
          content: "나의 장점을 최대한으로 이끌 수 있게 스타일링을 한다.",
        },
        {
          type: "웰시코기",
          score: 10,
          content: "깔끔하지만 스타일리시한 포인트를 준다.",
        },
        {
          type: "리트리버",
          score: 10,
          content: "기본템을 장착한 댄디하고 캐주얼한 느낌",
        },
      ],
    },
    {
      num: 9,
      question: "내가 가고싶은 여행지 스타일은?",
      answers: [
        {
          type: "비글",
          score: 2,
          content: "네온사인 가득~ 신나는 파라다이스 놀이공원",
        },
        {
          type: "치와와",
          score: 5,
          content: "이곳의 유명한 박물관이나 건물들은 꼭 가봐야지",
        },
        {
          type: "웰시코기",
          score: 10,
          content: "꽃, 나무 자연이 가득한 여행지",
        },
        {
          type: "포메라니안",
          score: 10,
          content: "친구들끼리 프라이빗하게 놀 수 있는 수영장이 있는 풀빌라",
        },
      ],
    },
  ];

  const result = [
    {
      type: "포메라니안",
      desc: `세상 제일 귀엽지만 세상 제일 지랄견인 나는 ‘포메라니안’ \n
    ✓   친구들에게 인기가 많은 타입으로 주변에 사람이 많고 늘 주인공 역할을 해요! \n
    ✓   활발하고 호기심이 많지만 겁이 너무 많아요 \n
    ✓   살짝 성격이 지랄맞을 때도 있는데 그럴 땐 좀 냅둬야 합니다. 풀어주려고 하지 말고 가만히 냅두세요. 알아서 풀리고 다시 기분이 좋아집니다.\n
    ✓   외모에 관심이 많은 스타일이라 스타일링을 바꾸고 싶어하지만 결국 다시 원래의 스타일로 돌아오곤 하죠.\n
    ✓   자기가 기분 좋을 땐 세상 애교쟁이, 기분 안 좋으면 세상 지랄견!\n
    ✓   사람을 너무 좋아해서 이것저것 다 퍼줍니다. \n
    ✓   기분 안 좋은 티를 숨기지 못해 가끔 표정관리가 안돼요.\n
    ✓   우리 친구들은 낯을 많이 가리는데 시간이 지나면서 친해지면 미친듯이 활기차게 놀아요.\n
    ✓   한 번 화나면 불같이 화를 내는 다혈질 적인 성격이 있어요.\n
    `,
      query: "1chqhwlqzhrfj",
      score_range: [0, 21],
      img_src:
        "https://images.ktestone.com/resultImages/daengdaeng/daengdaeng_pome.png",
    },
    {
      type: "치와와",
      desc: `작지만 용감한 난 질투쟁이 치와와~ 난 참지 않Z…!\n
    ✓   뽈뽈 돌아다니면서 많은 참견을 하는 참견쟁이들\n
    ✓   내 사람은 너무너무 소중하지만, 친하지 않은 사람들에겐 낯을 많이 가려요. 경계심 대마왕이라서 섣불리 다가가면 안 됩니다. 치와와 친구들에게 시간을 주세요!\n
    ✓   질투심이 많아서 조심해야해요. 잘못걸리는 순간 그날은 전쟁입니다. 나에게 질투에 대한 실험을 하지마세요!!\n
    ✓   불의를 보면 물불 가리지 않는 겁이 없는 용감한 용자! 으르렁!\n
    ✓   스트레스는 음식으로 풀 때가 있어요.\n
    ✓   내사람을 너무 좋아하다 보니 가끔 외로움을 많이 타요.\n
    ✓   눈치가 빨라서 행동에 막힘이 없이 재빠르게 움직이는 부지런쟁이들입니다.\n
    ✓   기부니가 좋을 땐 애교쟁이><기분이가 안 좋을 땐 까칠쟁이 -_-\n
    ✓   가끔 앞 뒤가 다른 사회생활 만랩이랍니다~\n
    ✓   참는 걸 극도로 싫어해요.`,
      query: "2tjsxorgudwlqzhrfj",
      score_range: [21, 41],
      img_src:
        "https://images.ktestone.com/resultImages/daengdaeng/daengdaeng_chiwawa.png",
    },
    {
      type: "웰시코기",
      desc: `도비가 부러운 자유로운 영혼인, 웰시코기\n
    ✓   상당히 활동적인 스타일, 열정이 가득해요. 허허..\n
    ✓   가끔 에너지가 너무 넘쳐나서 가끔 주변인들이 감당하기 힘들어요\n
    ✓   집에 있으면 시간이 너무 안가는 느낌, 밖을 나가야합니다.\n
    ✓   날 가두는 느낌 너무 힘들어.. 나에게 집착하지 말아줄래? 난 자유로운 영혼이거든! 알아서 잘하니까 너무 의심하거나 집착하지 말아주세요.\n
    ✓   하는 행동에 있어 단단함이 있고 자신감이 넘쳐나지만 친절해서 주위에 사람들이 넘쳐나요. 학생 시절엔 반장, 부반장의 경험 많죠. \n
    ✓   저 사람은 너무 순딩해하는 소리를 많이 듣지만 사실 나는 단호박입니다. \n
    ✓   눈으로 말을 하는 것 같은..뭔가…매력이 있어….왜지…눈으로 사람 설레게 하기 만랩\n
    ✓   이성에게 인기가 많은 타입이에요. 난 그냥 이 사람을 도와준 것 뿐인데 보면 저를 좋아하고 있더라구요. 왤까요? 하면서 다른 사람이 가지지 못한 마성의 매력`,
      query: "3ehfdusqusdlwlqzhrfj",
      score_range: [41, 61],
      img_src:
        "https://images.ktestone.com/resultImages/daengdaeng/daengdaeng_wealthy.png",
    },
    {
      type: "리트리버",
      desc: `친숙한 댕댕이 , 리트리버\n
    ✓   순한 성격의 소유자, 이런들 어떠하리~ 저런들 어떠하리~ 이해심이 넘쳐나요\n
    ✓   사람을 잘 따르고 상냥한 친절한 성격을 지니고 있어 주변에서 은근 좋아하는 이성이 많아요. 하지만 본인은 모르죠. 주인공아닌가요? \n
    ✓   어쩜 이렇게 화를 안낼까 하지만 화를 내면 세상 제일 무서워요.\n
    ✓   은근 아무것도 하기 싫고 잘 누워있는 편이라 주변에서 놀자고 해야해요. 아니면 집 밖에 잘 안나오려고 해서… 누군가라도 만나자고 하면 일단 만나니까 놀아줘요.\n
    ✓   순둥순둥해서 걱정하겠지만 은근히 모든 걸 다 잘해냅니다.\n
    ✓   한 번 놀 때 미친듯이 놀면 적당한 휴식이 꼭 필요해요\n
    ✓   사람 자체가 너무 편안해서 같이 있으면 그냥 행복해지는 에너자이저~\n
    ✓   인내심 최강자이면서 예의도 바르지만 또 장난꾸러기 하지만 머리도 좋아 뭐야 못하는게 뭐야~~완전 워너비 애인상이로구나!`,
      query: "4vmfhwlqzhrfj",
      score_range: [61, 81],
      img_src:
        "https://images.ktestone.com/resultImages/daengdaeng/daengdaeng_retriever.png",
    },
    {
      type: "비글",
      desc: `지치는 게 뭐야? ~~세상 미친 텐션 비글!\n
    ✓   체력이 대단하다고 생각할 정도로 미친 텐션의 소유자 비글!\n
    ✓   영리하고 머리가 좋아요~ 그래서 눈치도 수준급! \n
    ✓   여기저기 맛집 탐방을 좋아하고 음식을 너무 좋아해요. 맛집 물어보면 왠만한 건 다 알정도로 아주 맛집 리스트를 가지고 있죠.\n
    ✓   악마견이라 불리지만 사실은 에너지가 넘쳐나고 사람을 너무 좋아해서 관심을 달라는 말이에요. \n
    ✓   외로움을 많이 타서 늘 밖으로 나가고 싶어해요. 누구든 만나서 힘차게 놀아야 외롭지 않거든요. 혼자 있는 거 너무 싫어!!! 스트레스 만땅!\n
    ✓   노는게 제일 좋아~ 친구들 모여라~ 언제나! 즐거워!\n
    ✓   될 대로 돼라~~~라는 마인드 늘 긍정적이고 낙천적인 마인드의 소유자`,
      query: "4vmfhwlqzhrfj",
      score_range: [81, 101],
      img_src:
        "https://images.ktestone.com/resultImages/daengdaeng/daengdaeng_beagle.png",
    },
  ];

  useEffect(() => {
    // scores 배열이 변경될 때마다 총합을 계산하여 업데이트합니다.
    const sum = scores.reduce(
      (accumulator, currentScore) => accumulator + currentScore,
      0
    );
    setTotalScore(sum);

    return () => {
      // 퀴즈가 끝났을 때 결과를 계산하고 표시합니다.
      if (currentQuestion === questions.length - 1) {
        console.log(totalScore);
        calculateResult(sum);
      }
    };
  }, [scores, showResult]);

  const handleAnswer = (score: number) => {
    setScores((prevScores) => [...prevScores, score]);

    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(totalScore + score);
    }
  };

  const calculateResult = (e: number) => {
    let resultItem = null;

    for (let item of result) {
      const [start, end] = item.score_range;
      if (e >= start && e <= end) {
        resultItem = item;
      }
    }

    if (resultItem) {
      const descriptionLines = resultItem.desc.split("\n");
      setResultDescLines(descriptionLines);
      setResultImgSrc(resultItem.img_src);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores([]);
    setTotalScore(0);
    setShowResult(false);
    setResultImgSrc(null);
  };
  const navigate = useNavigate();
  const gotoAnimals = () => {
    navigate("/save-animals");
  };

  return (
    <>
      {showResult ? (
        // 결과를 표시합니다.
        <ResultBox>
          <StyledHeading>결과는 ...</StyledHeading>
          <img
            src={resultImgSrc || undefined}
            alt="Result"
            style={{
              width: "70%",
              height: "50%",
              display: "block",
              margin: "auto",
            }}
          />

          <DetailBox>
            {resultDescLines.map((line, index) => (
              <Detaillists key={index}>{line}</Detaillists>
            ))}
          </DetailBox>

          <StyledContainer>
            <StyledAnimalsButton onClick={gotoAnimals}>
              동물보러가기
            </StyledAnimalsButton>

            <StyledResetButton onClick={resetQuiz}>
              <Rowdiv>
                <RefreshImg src="src/assets/refresh.png" alt="refresh" />
                다시하기
              </Rowdiv>
            </StyledResetButton>
          </StyledContainer>
        </ResultBox>
      ) : (
        // 퀴즈 표시
        <>
          <header>
            <StyledHeading>
              {questions[currentQuestion]?.question}
            </StyledHeading>
          </header>

          <main>
            {questions[currentQuestion]?.answers.map((answer, index) => (
              <StyledButton
                key={index}
                onClick={() => handleAnswer(answer.score)}
                style={{ width: "100%", height: "100%" }}
              >
                {answer.content}
              </StyledButton>
            ))}
          </main>

          <footer>
            <StyledHeading>
              {questions[currentQuestion]?.num + 1} / {questions.length}
            </StyledHeading>
          </footer>
        </>
      )}
    </>
  );
}

export default AnimalMatching;
