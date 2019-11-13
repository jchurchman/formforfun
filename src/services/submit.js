import {
  INCOME,
  REQUEST,
  MAX_LOAN_AMT,
  MIN_LOAN_AMT,
  INCOME_DEBT_RATIO,
  REJECTED,
} from '../constants';

const evaluateLoan = ({ income, request }) => {
  if (request < MIN_LOAN_AMT) {
    return REJECTED.SMALL;
  }
  if (request > MAX_LOAN_AMT) {
    return REJECTED.LARGE;
  }
  if (request > (income * INCOME_DEBT_RATIO)) {
    return REJECTED.RATIO;
  }
  return true;
};

export default function (argObj) {
  const income = argObj[INCOME];
  const request = argObj[REQUEST];

  const submissions = localStorage.get('submissions') || []; // eslint-disable-line
  const evaluation = evaluateLoan({ income, request });

  localStorage.set( // eslint-disable-line
    'submissions',
    [
      ...submissions,
      {
        ...argObj,
        evaluation,
      },
    ],
  );
  return evaluation;
}
