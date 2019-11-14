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

  const record = localStorage.getItem('submissions'); // eslint-disable-line
  const submissions = record ? JSON.parse(record) : [];
  const evaluation = evaluateLoan({ income, request });

  localStorage.setItem( // eslint-disable-line
    'submissions',
    JSON.stringify([
      ...submissions,
      {
        ...argObj,
        evaluation,
      },
    ]),
  );
  return evaluation;
}
