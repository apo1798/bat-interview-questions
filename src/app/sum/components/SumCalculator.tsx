'use client';

import { useState } from 'react';

const SumCalculator = ({}) => {
  const [lastNumber, setLastNumber] = useState<number | string | bigint>(1);

  const sum = (lastNumber: number | bigint) => {
    if (lastNumber === 1) return 1;
    if (lastNumber === 2) return 1 + 2;

    if (typeof lastNumber == 'bigint') {
      return (
        1n +
        (lastNumber / 2n) * -1n +
        ((lastNumber - 1n) % 2n === 1n ? lastNumber : 0n)
      ).toString();
    }

    return (
      1 +
      Math.floor((lastNumber - 1) / 2) * -1 +
      ((lastNumber - 1) % 2 === 1 ? lastNumber : 0)
    );
  };

  const isNumberPositiveInteger =
    +lastNumber.toString() > 0 && Number.isInteger(+lastNumber.toString());

  return (
    <div className='container my-20 grid place-content-center place-items-center space-y-2'>
      <h2 className='text-xl'>寫一個函式計算下列公式之總和</h2>
      <p className='text-4xl'> 1+2-3+4-5+6-.....+ 或 - N</p>
      <div className='flex flex-wrap items-center gap-2'>
        <p>請填入正整數N</p>
        <input
          autoFocus
          value={lastNumber.toString()}
          onChange={(e) => {
            const inputNumber = e.target.value.replaceAll('.', '');

            if (+inputNumber > Number.MAX_SAFE_INTEGER) {
              setLastNumber(BigInt(inputNumber));
            } else {
              setLastNumber(inputNumber);
            }
          }}
          className='min-w-[26rem] rounded border border-slate-600 px-2 py-1 text-black'
        />
      </div>
      {isNumberPositiveInteger ? (
        <p className='text-end text-amber-500'>
          總和: {sum(typeof lastNumber !== 'bigint' ? +lastNumber : lastNumber)}
        </p>
      ) : (
        <p className='text-red-500'>請輸入正整數</p>
      )}
    </div>
  );
};

export default SumCalculator;
