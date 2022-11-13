import {
  faBackward,
  faCircleDown,
  faCircleUp,
  faCopy,
  faCrow,
  faEye,
  faFan,
  faFire,
  faForward,
  faGem,
  faHand,
  faHatCowboySide,
  faMasksTheater,
  faMoon,
  faPersonCane,
  faRocket,
  faSchool,
  faSnowflake,
  faSpider,
  faSquareCheck,
  faSquareMinus,
  faSun,
  faTree,
  faUserAstronaut,
  faUserGraduate,
  faWeightHanging,
  faYinYang,
} from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";

const QuestionList = [
  {
    position: 0,
    choices: {
      left: { icon: faForward, value: 1 },
      right: { icon: faBackward, value: -1 },
    },
  },
  {
    position: 1,
    choices: {
      left: { icon: faFan, value: -1 },
      right: { icon: faCrow, value: 1 },
    },
  },
  {
    position: 2,
    choices: {
      left: { icon: faYinYang, value: -1 },
      right: {
        icon: faYinYang,
        value: 1,
        style: { transform: "rotate(180deg)" },
      },
    },
  },
  {
    position: 3,
    choices: {
      left: { icon: faUserAstronaut, value: 1, style: { color: "#0d0d0d" } },
      right: {
        icon: faUserGraduate,
        value: -1,
        style: { color: "#FF3A20" },
      },
    },
  },
  {
    position: 4,
    choices: {
      left: { icon: faHatCowboySide, value: 1 },
      right: {
        icon: faGem,
        value: -1,
      },
    },
  },
  {
    position: 5,
    choices: {
      left: { icon: faSchool, value: -1, style: { color: "#F28123" } },
      right: {
        icon: faRocket,
        value: 1,
        style: { color: "#595959" },
      },
    },
  },
  {
    position: 6,
    choices: {
      left: { icon: faTree, value: -1, style: { color: "#fefefe" } },
      right: {
        icon: faTree,
        value: 1,
        style: { color: "#0d0d0d" },
      },
    },
  },
  {
    position: 7,
    choices: {
      left: { icon: faMasksTheater, value: -1 },
      right: {
        icon: faPersonCane,
        value: 1,
      },
    },
  },
  {
    position: 8,
    choices: {
      left: { icon: faCircleDown, value: 1 },
      right: {
        icon: faCircleUp,
        value: -1,
      },
    },
  },
  {
    position: 9,
    choices: {
      left: { icon: faEye, value: 1 },
      right: {
        icon: faHand,
        value: -1,
      },
    },
  },
  {
    position: 10,
    choices: {
      left: { icon: faLightbulb, value: 1 },
      right: {
        icon: faWeightHanging,
        value: -1,
      },
    },
  },
  {
    position: 11,
    choices: {
      left: { icon: faCopy, value: -1 },
      right: {
        icon: faSpider,
        value: 1,
      },
    },
  },
  {
    position: 12,
    choices: {
      left: { icon: faSun, value: -1 },
      right: {
        icon: faMoon,
        value: 1,
      },
    },
  },
  {
    position: 13,
    choices: {
      left: { icon: faSnowflake, value: 1 },
      right: {
        icon: faFire,
        value: -1,
      },
    },
  },
  {
    position: 14,
    choices: {
      left: { icon: faSquareCheck, value: -1 },
      right: {
        icon: faSquareMinus,
        value: 1,
      },
    },
  },
];

export default QuestionList;
